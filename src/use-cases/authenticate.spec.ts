/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import {expect, describe, it, beforeEach} from "vitest"
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {

       await usersRepository.create({
            name: 'Gabriel souza',
            email: 'gabriel@example.com',
            password_hash: await hash('123456', 6),
       })

        const {user} = await sut.execute({
            email: 'gabriel@example.com',
            password: '123456'
        })


        await expect(user.id).toEqual(expect.any(String))

    }) 

    it('should not be able to authenticate with wrong email', async () => {
    

        await expect(() => sut.execute({
             email: 'gabriel@example.com',
             password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

    }) 

    it('should not be able to authenticate with wrong password', async () => {
       
        await usersRepository.create({
            name: 'Carlos Souza',
            email: 'carlos@example.com',
            password_hash: await hash('123456', 6),
       })

        await expect(() => 
        sut.execute({
            email: 'carlos@example.com',
            password: '123432',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

    }) 

})