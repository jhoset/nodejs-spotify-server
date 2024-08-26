import { Response } from "express";
import { CustomError } from "./custom-error";

export const handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        if ( error.statusCode === 500 ) console.log(`- Error (500): ${error.details}`)
        return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`- Error (500 - Unhandled): ${error}`)
    return res.status(500).json( { error: 'Internal Server Error,  Please try again later.' } )
}