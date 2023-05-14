import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccessControl {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await auth.use('api').authenticate()
    console.log('Cek role : ', auth.user?.role)
    if(auth.user?.role != 'petugas'){
      return response.forbidden({
        message: 'hanya boleh petugas yang melakukan'
      })
    }
    // console.log(`${allowedRoles} can access`)
    await next()
  }
}
