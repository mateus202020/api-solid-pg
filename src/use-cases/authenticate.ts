/* eslint-disable prettier/prettier */
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRespository: UsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.userRespository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return{
            user,
        }

    }
}