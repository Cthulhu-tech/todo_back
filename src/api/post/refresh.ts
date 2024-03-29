import { createRefreshToken } from "../utils/token/createRefreshToken";
import { createAccessToken } from "../utils/token/createAcessToken";
import { sendRefreshToken } from "../utils/token/sendRefreshToken";
import { connectDB } from "../utils/dbConnect/connect";
import { IReapeatUser } from "../interface/db";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const refresh = async (request: Request, response: Response) => {

    try {
      
      const token = request?.cookies?.refreshtoken;

      if (!token) return response.json({ accesstoken: null });
  
      let payload: any = null;

      try {

        payload = verify(token, (process.env.REFRESH_TOKEN_SECRET as string));
  
      } catch (err) {

        return response.send({ accesstoken: null });
  
      }

      const connection = await connectDB();
  
      const user = await connection.query<IReapeatUser[]>('SELECT * FROM user WHERE id = ?', [payload.userId]);

      if (!user[0][0]) return response.send({ accesstoken: null });
      
      if (user[0][0].jwt !== token)
        return response.json({ accesstoken: null });
  
      const accesstoken = await createAccessToken(+user[0][0].id, "15m");

      const refreshtoken = await createRefreshToken(+user[0][0].id, "7d");
  
      await connection.query('UPDATE user SET jwt = ? WHERE id = ?', [refreshtoken, payload.userId]);

      const user_info = await connection.query<IReapeatUser[]>('SELECT * FROM user WHERE id = ?', [payload.userId]);
  
      sendRefreshToken(response, refreshtoken);
      
      connection.end();
        
        response.status(201).json({
            
            login: user_info[0][0].login,
            message: 'token refresh',
            accesstoken,
            auth: true

        });
  
    } catch (error) {
      
      console.log(error);
  
      response.status(500).json({ error: 'unknown error' });
  
    }
  
  }