import { randomUUID } from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

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
    port: env.PORT,
  })
  .then(() => console.log(`listening on port ${env.PORT}...`))
