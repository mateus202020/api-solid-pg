/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CheckInUseCase } from "./checkin"
import { expect, describe, it, beforeEach} from "vitest"
import { FetchUserCheckInHistory } from "./fetch-user-check-ins-history"
import { SearchGymsUseCase } from "./search-gyms"



let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase


describe('Search Gyms Use Case', () => {
    beforeEach( async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })



    it('should be able to search for gyms', async () => {

        await gymsRepository.create({
            title: "JavaScript Gym",
            description: null,
            phone: null,
            latitude: -20.7133342,
            longitude: -44.8307573,
        })


        await gymsRepository.create({
            title: "JavaScript Bootcamp Gym",          
            description: null,
            phone: null,
            latitude: -20.7133342,
            longitude: -44.8307573,
        })

        const {gyms} = await sut.execute({
            query: "Javascript",
            page: 1
        })


        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
          expect.objectContaining({ title: "JavaScript Gym" }),
          expect.objectContaining({ title: "JavaScript Bootcamp Gym" }),
        ])
        
    }) 

    
    it('should be able to fetch paginated gyms search', async () => {

        for(let i = 1; i <= 22; i++){
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -20.7133342,
                longitude: -44.8307573,
            })
        }

        const { gyms } = await sut.execute({
            query: "JavaScript",
            page: 2,
        })


        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: "JavaScript Gym 21" }),
            expect.objectContaining({ title: "JavaScript Gym 22" }),
          ])
          

    }) 
    
})
