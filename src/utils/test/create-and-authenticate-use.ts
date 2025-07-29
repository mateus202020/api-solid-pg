/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
        name: "Mateus Gabriel",
        email: 'mateus@exemple.com',
        password_hash: await hash('123456', 6),
        role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

    const authResponse = await request(app.server).post("/sessions").send({
        email: 'mateus@exemple.com',
        password: '123456',
    })

    const { token } = authResponse.body

    return {
        token,
    }
}

