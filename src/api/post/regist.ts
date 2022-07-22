import { connectDB } from "../utils/dbConnect/connect";
import { IReapeatUser } from "../interface/db";
import { Request, Response } from "express";
import { hash } from "bcrypt";

export const regist = async (req:Request, res:Response) => {

    try{

        const { login, password } = req.body;

        if(login === undefined || password === undefined || login.length > 54 || password.length > 255 || login.length === 0 || password.length === 0) res.status(403).end({"message": "Invalid login or password"});
        
        const connect = await connectDB();

        const repeatLogin = await connect.query<IReapeatUser[]>("SELECT * FROM user WHERE login = ?", [login]);

        if(repeatLogin[0].length > 0){

            connect.end();

            return res.status(403).json({"error": "login is used"});

        }

        const hashedPassword = await hash(password, 10);
        
        await connect.query("INSERT INTO user (login, password) VALUES (?, ?)", [login, hashedPassword]);

        await connect.end();

        res.status(201).json({"message": "user created"});

    }catch(err){

        console.log({err})

        res.status(500).json({"error": "unknown"});

    }



}