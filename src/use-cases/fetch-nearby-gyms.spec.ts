/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, describe, it, beforeEach} from "vitest"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"



let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase


describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach( async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })



    it('should be able to Fetch nearby gyms', async () => {

        await gymsRepository.create({
            title: "Near Gym",
            description: null,
            phone: null,
            latitude: -20.7133342,
            longitude: -44.8307573,
          })
          
          await gymsRepository.create({
            title: "Far Gym",
            description: null,
            phone: null,
            latitude: -21.0000000, // MUITO mais distante
            longitude: -44.0000000,
          })
          

        const {gyms} = await sut.execute({
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,
        })


        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym"})])
    }) 


})
