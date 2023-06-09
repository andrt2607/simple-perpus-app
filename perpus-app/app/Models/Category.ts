import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class Category extends BaseModel {
  /**
		* @swagger
		* definitions:
			*  Category:
			*    type: object 
      *    properties:
      *     nama:
      *       type: string
      *     required:
      *       - nama
			* 
		*/
  public static table = 'categories'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Book, {
    foreignKey: 'category_id'
  })
  public books: HasMany<typeof Book>
}
