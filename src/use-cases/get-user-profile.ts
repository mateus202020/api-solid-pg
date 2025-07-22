/* eslint-disable prettier/prettier */
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resoucer-not-found-errors";

interface GetUserProfileRequest{
    userId: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private userRespository: UsersRepository) {}

    async execute({userId,}: GetUserProfileRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.userRespository.findById(userId)

        if(!user){
            throw new ResourceNotFoundError()
        }

        return{
            user,
        }

    }
}