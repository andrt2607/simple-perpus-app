import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.enu('role', ['user','petugas']).defaultTo('user')
      // {
      //   useNative: true,
      //   enumName: 'user_role',
      //   existingType: false
      // })
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true,true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}