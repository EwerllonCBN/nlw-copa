import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })
  fastify.get('/pools/count', () => {
    const count = prisma.pool.count()
    return { count: 1 }
  })

  //Para funcionar em ambiente mobile, é necessário definir o host.

  await fastify.listen({ port: 3333 /*host: '0.0.0.0'*/ })
}

bootstrap()
