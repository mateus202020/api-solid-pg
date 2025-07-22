/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CheckInUseCase } from "./checkin"
import { Decimal } from "@prisma/client/runtime/library"
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest"
import { MaxNumberOfCheckInseError } from "./erros/max-number-of-check-ins-error"
import { MaxDistanceError } from "./erros/max-distance-error"


let checkInsRepository: InMemoryUsersRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase


describe('Check-in Use Case', () => {
    beforeEach( async () => {
        checkInsRepository = new InMemoryUsersRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)



        await gymsRepository.create({
            id: 'gym-01',
            title: 'JavaScript',
            description: '',
            phone: '',
            latitude: -20.7133342,
            longitude: -44.8307573
        })


        vi.useFakeTimers()
    })


  afterEach(() => {
    vi.useRealTimers()
  })


    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {


        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,
        })


        expect(checkIn.id).toEqual(expect.any(String))

    }) 

    it('shoul not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,

        })).rejects.toBeInstanceOf(MaxNumberOfCheckInseError)

    }) 

    it('shoul be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,
        })

      

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const {checkIn} =  await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    }) 


    it('shoul not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript',
            description: '',
            phone: '',
            latitude: new Decimal(-20.7012834),
            longitude: new Decimal(-44.8244615)
        })

        await  expect(() => 
        sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -20.7133342,
            userLongitude: -44.8307573,
        }),
    ).rejects.toBeInstanceOf(MaxDistanceError)

        
    }) 
    
})
