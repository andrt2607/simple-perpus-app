import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Borrow from 'App/Models/Borrow'

export default class BorrowsController {
    public async get({response} : HttpContextContract){
        const borrowsResult = await Borrow.query().preload('users')

        if(borrowsResult.length==0){
            return response.notFound({
                message: 'Data peminjaman tidak ditemukan'
            })
        }

        return response.ok({
            message: 'Data peminjaman ditemukan',
            data: borrowsResult
        })
    }

    public async getById({response, params} : HttpContextContract){
        const borrowsResult = await Borrow.find(params.id)

        if(!borrowsResult){
            return response.notFound({
                message: `Data peminjaman ${params.id} tidak ditemukan`
            })
        }

        return response.ok({
            message: `Data peminjaman ditemukan`,
            data: borrowsResult
        })
    }

    public async createBorrow({request, response} : HttpContextContract){
        
        
        const borrow = new Borrow()
        borrow.user_id = request.input('userId')
        borrow.book_id = request.input('bookId')
        borrow.startDate = request.input('startDate')
        borrow.endDate = request.input('endDate')

        await borrow.save()

        return response.ok({
            message: 'Berhasil tambah peminjaman'
        })
    }
}
