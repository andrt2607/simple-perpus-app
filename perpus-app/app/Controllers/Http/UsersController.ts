import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
    public async register({request, response} : HttpContextContract){
        // try {
            const payload = await request.validate(RegisterUserValidator)

            // const user = new User()
            // user.email = payload.email
            // user.password = payload.password
            // user.role = payload.role

            // await user.save()

            const newUser = await User.create(payload)
            const otpCode = Math.floor(100000 + Math.random() * 900000)

            await Database.table('otp_codes').insert({ otp_code: otpCode, users_id: newUser.id})

            await Mail.send((message) => {
                message
                  .from('admin@perpusapp.com')
                  .to(payload.email)
                  .subject('Welcome Onboard!')
                  .htmlView('emails/otp_verification', { otpCode })
              })


            return response.created({
                message: 'Register Berhasil, please verify ur otp code'
            })
        // } catch (error) {
        //     return response.unprocessableEntity({
        //         message: error.message
        //     })
        // }
    }

    public async otpConfirmation({request, response} : HttpContextContract){
        let otpCode = request.input('otp_code')
        let email = request.input('email')

        let user = await User.findBy('email', email)
        let otpCheck = await Database.query().from('otp_codes').where('otp_code', otpCode).first()

        if(user?.id == otpCheck.users_id){
            user!!.isVerified = true
            await user!!.save()
            return response.ok({
                message: 'berhasil konfirmasi otp'
            })
        }else{
            return response.badRequest({
                message: 'gagal verifikasi otp'
            })
        }
    }

    public async login({auth, request, response} : HttpContextContract){
        const loginValidation = schema.create({
            email: schema.string(),
            password: schema.string()
          })

          await request.validate({schema: loginValidation})

          const email = request.input('email')
          const password = request.input('password')

          console.log(email)
          console.log(password)

          const user = await User.findBy('email', email)
          if(user?.isVerified == false){
            return response.unauthorized({
                message: 'anda tidak bisa login, sebelum verify otp akun anda'
            })
          }

          try {
            const generateToken = await auth.use('api').attempt(email, password, {
                expiresIn: '2 days'
            })
            // await auth.use('web').login(login)
            return response.ok({
                message: 'Login Berhasil', generateToken
                
            })
          } 
          catch(error) {
            return response.unauthorized({
                message: 'Invalid credentials'
            })
          }
    }

    public async me({auth, response} : HttpContextContract){
        const user = auth.user

        return response.ok({
            message: user
        })
    }

    public async logout({auth, response} : HttpContextContract){
        await auth.use('api').revoke()
        return response.ok({
            message: 'Berhasil logout'
        })
    }

    public async updateProfile({auth, request, response} : HttpContextContract){
        const userData = auth.user

        const profileValidation = schema.create({
            bio: schema.string(),
            address: schema.string()
          })

          await request.validate({schema: profileValidation})

          const address = request.input('address')
          const bio = request.input('bio')

          console.log(address)
          console.log(bio)

          const persistancePayload = {
            address,
            bio
          }

          await userData?.related("profile").updateOrCreate({}, persistancePayload)

          return response.ok({
            message: 'Sukses tambah/edit profile'
          })
    }
}
