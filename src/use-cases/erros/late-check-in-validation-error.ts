/* eslint-disable prettier/prettier */
export class LateCheckInValidationError extends Error{
    constructor(){
        super(
            "the check-in can only be validated until 2- minutes of its creation.",
        )
    }
}