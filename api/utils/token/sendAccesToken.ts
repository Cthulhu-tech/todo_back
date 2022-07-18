import { Request, Response } from "express";
import { IReapeatUser } from "../../interface/db";

export const sendAccessToken = (response:Response, accesstoken:string, user:IReapeatUser) => {

    response.status(201).send({
        
        login: user.login,
        message: 'you have successfully logged in',
        accesstoken,
        auth: true

    });

};