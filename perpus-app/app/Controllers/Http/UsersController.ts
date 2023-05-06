import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class UsersController {
    public async register({request, response} : HttpContextContract){
        // try {
            const payload = await request.validate(RegisterUserValidator)

            // const user = new User()
            // user.email = payload.email
            // user.password = payload.password
            // user.role = payload.role

            // await user.save()

            await User.create(payload)

            return response.created({
                message: 'Register Berhasil'
            })
        // } catch (error) {
        //     return response.unprocessableEntity({
        //         message: error.message
        //     })
        // }
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

          try {
            const generateToken = await auth.use('api').attempt(email, password, {
                expiresIn: '2 days'
            })
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
