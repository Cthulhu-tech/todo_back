import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

export const ChechAuthorization = (request: Request, response: Response) => {

    try{

      const authorization = request.headers['authorization'];

      if (!authorization) throw new Error('Authorization need');

      const token = authorization.split(' ')[1];

      const { userId } = (verify(token, (process.env.ACCESS_TOKEN_SECRET as string)) as JwtPayload);

      return userId;

    }catch(error: unknown){

      if (error instanceof Error){

        response.send({message: `${error.message}`});

      }else{

        response.send({message: "unknown error"});

      }

    }

};