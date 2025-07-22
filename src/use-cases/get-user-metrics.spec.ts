/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { expect, describe, it, beforeEach} from "vitest"
import { GetUserMetricsUseCase } from "./get-user-metrics"



let checkInsRepository: InMemoryUsersRepository
let sut: GetUserMetricsUseCase


describe('Get User Metrics Use Case ', () => {
    beforeEach( async () => {
        checkInsRepository = new InMemoryUsersRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })



    it('should be able to get check-ins count from metrics', async () => {

        await checkInsRepository.create({
            gym_id: "gym-01",
            user_Id: "user-01"
        })


        await checkInsRepository.create({
            gym_id: "gym-02",
            user_Id: "user-01"
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })


        expect(checkInsCount).toBe(2)


    }) 

    
})
