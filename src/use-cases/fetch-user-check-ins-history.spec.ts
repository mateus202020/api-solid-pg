/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./checkin"
import { expect, describe, it, beforeEach} from "vitest"
import { FetchUserCheckInHistory } from "./fetch-user-check-ins-history"



let checkInsRepository: InMemoryUsersRepository
let sut: CheckInUseCase


describe('Fetch User Check-in history Use Case', () => {
    beforeEach( async () => {
        checkInsRepository = new InMemoryUsersRepository()
        sut = new FetchUserCheckInHistory(checkInsRepository)
    })



    it('should be able to fetch check-in history', async () => {

        await checkInsRepository.create({
            gym_id: "gym-01",
            user_Id: "user-01"
        })


        await checkInsRepository.create({
            gym_id: "gym-02",
            user_Id: "user-01"
        })

        const {checkIns} = await sut.execute({
            userId: 'user-01',
            page: 1
        })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym-01"}),
            expect.objectContaining({ gym_id: "gym-02"})
        ])

    }) 

    
    it('should be able to fetch paginate check-in history', async () => {

        for(let i = 1; i <= 22; i++){
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_Id: 'user-01',
            })
        }

        const {checkIns} = await sut.execute({
            userId: 'user-01',
            page: 2
        })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym-21"}),
            expect.objectContaining({ gym_id: "gym-22"})
        ])

    }) 
    
})
