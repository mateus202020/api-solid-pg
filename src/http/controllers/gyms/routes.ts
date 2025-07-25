/* eslint-disable prettier/prettier */
import { FastifyInstance } from "fastify";


import { verifyJWT } from "../../middlewares/verify-jwt";

export async function gymsRoutes(app: FastifyInstance) {
   app.addHook('onRequest', verifyJWT)
}