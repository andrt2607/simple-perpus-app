import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import CreateBookValidator from 'App/Validators/CreateBookValidator'

export default class BooksController {
    
    public async store({request, response} : HttpContextContract){
        
        const payload = await request.validate(CreateBookValidator)

        const book = await Book.create(payload)

        return response.created({
            message: 'Berhasil tambah book',
            data: book
        })
    }

    public async index({response} : HttpContextContract){
        const books = await Book.query().preload('category')

        if(books.length==0){
            return response.notFound({
                message: 'data Book tidak ditemukan',
            })
        }

        return response.ok({
            message: 'data Book ditemukan',
            data: books
        })
    }

    public async show({response, params} : HttpContextContract){
        const book = await Book.query().preload('category').where('id', params.id).first()

        if(!book){
            return response.notFound({
                message: `data Book dengan id ${params.id} tidak ditemukan`,
            })
        }

        return response.ok({
            message: `data Book dengan id ${params.id} ditemukan`,
            data: book
        })
    }

    public async update({request, response, params} : HttpContextContract){
        
        const payload = await request.validate(CreateBookValidator)

        
        const book = await Book.findOrFail(params.id)
        book.title = payload.title
        book.summary = payload.summary
        book.releaseDate = payload.releaseDate
        book.category_id = payload.category_id
        
        await book.save()
        
        const updatedBook = await Book.find(params.id)
        if(!updatedBook){
            return response.notFound({
                message: `data Book dengan id ${params.id} tidak ditemukan`,
            })
        }

        return response.ok({
            message: `data Book dengan id ${params.id} berhasil diupdate`,
            data: updatedBook
        })
    }

    public async destroy({response, params} : HttpContextContract){
        const book = await Book.findOrFail(params.id)
        await book.delete()
        if(!Book){
            return response.badRequest({
                message: `data Book dengan id ${params.id} gagla dihapus`,
            })
        }
        return response.ok({
            message: `data Book dengan id ${params.id} berhasil dihapus`,
        })
    }
}
