/* eslint-disable prettier/prettier */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factores/make-create-gym-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
    }),

    longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeCreateGymUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
  })

  return reply.status(200).send({
    gyms
  })
}
