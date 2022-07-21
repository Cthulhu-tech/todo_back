import { createRefreshToken } from "../utils/token/createRefreshToken";
import { createAccessToken } from "../utils/token/createAcessToken";
import { sendRefreshToken } from "../utils/token/sendRefreshToken";
import { sendAccessToken } from "../utils/token/sendAccesToken";
import { connectDB } from "../utils/dbConnect/connect";
import { IReapeatUser } from "../interface/db";
import { Request, Response } from "express";
import { compare } from "bcrypt";

export const login = async (req: Request, res: Response) => {

    try{

    const { login, password } = req.body;

    if(login === undefined || password === undefined || login.length > 54 || password.length > 255 || login.length === 0 || password.length === 0) res.status(403).end({"message": "Invalid login or password"});

    const connection = await connectDB();

    const user = await connection.query<IReapeatUser[]>('SELECT * FROM user WHERE login = ?', [login]);

    if(user[0].length > 0){

        const valid = await compare(password, user[0][0].password);

        if(!valid){

            connection.end();

            res.status(403).json({error: 'Invalid login or password'});
    
            return;

        }

        const accesstoken = await createAccessToken(+user[0][0].id, '15m');
        const refreshtoken = await createRefreshToken(+user[0][0].id, '7d');

        await connection.query('UPDATE user SET jwt = ? WHERE login = ?', [refreshtoken, login]);

        await connection.end();

        await sendRefreshToken(res, refreshtoken);
        await sendAccessToken(res, accesstoken, user[0][0]);
        

    }else{

        connection.end();

        res.status(403).json({error: "Invalid login or password"});

        return;

    }
    
    }catch(error){
        
        console.log(error);

        res.status(500).json({error: "server error"});

        return;

    }

}