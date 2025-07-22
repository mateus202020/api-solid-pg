/* eslint-disable prettier/prettier */
export class MaxNumberOfCheckInseError extends Error{
    constructor(){
        super("Max number of check-ins reached.")
    }
}