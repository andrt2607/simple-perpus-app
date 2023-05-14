import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Verify {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await auth.use('api').authenticate()
    if(auth.user?.isVerified == false){
      return response.unauthorized({
        message: 'harap verifikasi otp akun'
      })
    }

    await next()
  }
}
