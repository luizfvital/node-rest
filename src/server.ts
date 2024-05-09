import { randomUUID } from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const transactions = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transaction Test',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('listening on port 3333...'))
