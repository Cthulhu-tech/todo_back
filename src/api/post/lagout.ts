import { Request, Response } from "express";

export const lagout = (req:Request, res:Response) => {

    res.clearCookie('refreshtoken', { path: '/refresh' });

    return res.status(200).json({message: 'lagout'});

}