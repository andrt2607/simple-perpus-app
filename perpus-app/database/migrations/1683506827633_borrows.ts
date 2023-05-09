import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'borrows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('start_date')
      table.string('end_date')
      table.integer('user_id')
      .unsigned().references('users.id')
      table.integer('book_id')
      .unsigned().references('books.id')
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
