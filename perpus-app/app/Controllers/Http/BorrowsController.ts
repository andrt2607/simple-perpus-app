import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import Borrow from 'App/Models/Borrow'
import User from 'App/Models/User'

export default class BorrowsController {
    //! NOTE : still bug
    public async get({auth, response} : HttpContextContract){
        await auth.use('api').authenticate()
        const borrowsResult = await Borrow.all()
        // const borrowsResult = await User.query().preload('books')

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

    public async getById({auth, response, params} : HttpContextContract){
        await auth.use('api').authenticate()
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

    public async createBorrow({auth, request, response} : HttpContextContract){
        await auth.use('api').authenticate()
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
