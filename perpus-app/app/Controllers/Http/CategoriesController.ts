import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoriesController {
    public async store({request, response} : HttpContextContract){
        
        const payload = await request.validate(CreateCategoryValidator)
        
        // const category = new Category()
        
        // const object = request.body

        // console.log('Payload : ',payload)

        // category.nama = object.name['nama']
        
        // await category.save()

        const category = await Category.create(payload)

        // if(!category){
        //     return response.badRequest({
        //         message: 'Gagal tambah category'
        //     })
        // }

        return response.created({
            message: 'Berhasil tambah category',
            data: category
        })
    }

    public async index({response} : HttpContextContract){
        const categories = await Category.all()

        if(!categories){
            return response.notFound({
                message: 'data category tidak ditemukan',
            })
        }

        return response.ok({
            message: 'data category ditemukan',
            data: categories
        })
    }

    public async show({response, params} : HttpContextContract){
        const category = await Category.find(params.id)

        if(!category){
            return response.notFound({
                message: `data category dengan id ${params.id} tidak ditemukan`,
            })
        }

        return response.ok({
            message: `data category dengan id ${params.id} ditemukan`,
            data: category
        })
    }

    public async update({request, response, params} : HttpContextContract){
        
        const payload = await request.validate(CreateCategoryValidator)

        // const category = await Category.query().where('id', params.id).update({name: request.body.nama})

        
        const category = await Category.findOrFail(params.id)
        category.nama = payload.nama
        
        await category.save()
        
        const updatedCategory = await Category.find(params.id)
        if(!category){
            return response.notFound({
                message: `data category dengan id ${params.id} tidak ditemukan`,
            })
        }

        return response.ok({
            message: `data category dengan id ${params.id} berhasil diupdate`,
            data: updatedCategory
        })
    }

    public async destroy({response, params} : HttpContextContract){
        const category = await Category.findOrFail(params.id)
        await category.delete()
        if(!category){
            return response.badRequest({
                message: `data category dengan id ${params.id} gagla dihapus`,
            })
        }
        return response.ok({
            message: `data category dengan id ${params.id} berhasil dihapus`,
        })
    }



}
