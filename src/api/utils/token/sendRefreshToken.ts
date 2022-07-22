import { Response } from "express";

export const sendRefreshToken = (response:Response, token:string) => {

    response.cookie('refreshtoken', token, {

        httpOnly: true,
        path: '/refresh',

    });

};