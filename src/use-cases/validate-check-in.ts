/* eslint-disable prettier/prettier */
import { CheckInsRepository} from "@/repositories/check-ins-repository";
import { CheckIn } from "generated/prisma";
import { ResourceNotFoundError } from "./erros/resoucer-not-found-errors";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";


interface ValidateCheckInUseCaseRequest{
    checkInId: string
   
}

interface ValidateCheckInUseCaseResponse {
    checkInId: CheckIn
}

export class ValidateCheckInUseCase{
    constructor(private checkInsRepository: CheckInsRepository) {}   

    async execute({
        checkInId, 
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{

       const checkIn = await this.checkInsRepository.findById(checkInId)

       if(!checkIn){
            throw new ResourceNotFoundError()
       }

       const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes",
       )

       if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
       }

       checkIn.validated_at = new Date()

       await this.checkInsRepository.save(checkIn)

       return {
            checkIn,
       }
    }
}

