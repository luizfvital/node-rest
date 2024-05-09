import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .table('transactions', (table) => {
      table.text('title')
    })
    .then(() => knex.raw('UPDATE transactions SET title = text'))
    .then(() =>
      knex.schema.table('transactions', (table) => {
        table.dropColumn('text')
      }),
    )
    .then(() =>
      knex.schema.table('transactions', (table) => {
        table.text('title').notNullable().alter()
      }),
    )
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .table('transactions', (table) => {
      table.text('text')
    })
    .then(() => knex.raw('UPDATE transactions SET text = title'))
    .then(() => {
      knex.schema.table('transactions', (table) => {
        table.dropColumn('title')
      })
    })
}
