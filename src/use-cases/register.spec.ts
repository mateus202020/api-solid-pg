/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import {expect, describe, it, beforeEach} from "vitest"
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";


let UsersRepository = InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        UsersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(UsersRepository) 
   })

    it('should be able to register', async () => {

        const {user} = await sut.execute({
            name: 'Gabriel Souza',
            email: 'gabriel@example.com',
            password: '123456'
        })


        await expect(user.id).toEqual(expect.any(String))

    }) 

    it('should hash user password upon registration', async () => {
       

        const {user} = await sut.execute({
            name: 'Gabriel Souza',
            email: 'gabriel@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        await expect(isPasswordCorrectlyHashed).toBe(true)
    })
   

    it('should not be able to register with same email twice', async () => {
      

       const email = 'gabriel@example.com'

        await sut.execute({
            name: 'Gabriel Souza',
            email,
            password: '123456'
        })

        await expect(
            sut.execute({
              name: 'Gabriel souza',
              email,
              password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
          
    }) 
})