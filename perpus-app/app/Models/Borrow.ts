import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'

export default class Borrow extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @column()
  public book_id: number
  @column()
  public startDate: string

  @column()
  public endDate: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTable: 'users'
  })
  public users: ManyToMany<typeof User>
}
