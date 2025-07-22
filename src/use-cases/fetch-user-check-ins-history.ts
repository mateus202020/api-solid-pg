/* eslint-disable prettier/prettier */
import { CheckIn } from "generated/prisma";
import { CheckInsRepository } from "@/repositories/check-ins-repository";



interface FetchUserCheckInHistoryRequest{
    userId: string
    page: number
}

interface FetchUserCheckInHistoryResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInHistory{
    constructor(private checkInsRepository: CheckInsRepository,) {}   

    async execute({
        userId, 
        page 
    }: FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const checkIns = await this.checkInsRepository.findManyByUserId(
            userId, 
            page
        )


       return {
            checkIns,
       }
    }
}

