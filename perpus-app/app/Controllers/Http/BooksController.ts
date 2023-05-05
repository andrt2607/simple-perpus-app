import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import CreateBookValidator from 'App/Validators/CreateBookValidator'

export default class BooksController {
    public async store({request, response} : HttpContextContract){
        const payload = await request.validate(CreateBookValidator)

        // const books = new Book()

        // books.na

        const book = await Book.create(payload)

        if(!book){
            return response.badRequest({
                message: 'Gagal tambah buku'
            })
        }

        return response.ok({
            message: 'Berhasil tambah buku',
            data: book
        })
    }
}
