import { ChechAuthorization } from "../utils/token/checkAuth";
import { connectDB } from "../utils/dbConnect/connect";
import { Timestamp } from "../utils/timestamp";
import { Request, Response } from "express";

export const add = async (req:Request, res:Response) => {

    const {text} = req.body;

    if(!!text){

        const userId = ChechAuthorization(req, res);

        try{
    
            if(userId){
    
                const connection = await connectDB();
        
                await connection.query("INSERT INTO todo (user_id, todo_time_start, todo_text) VALUES(?, ?, ?)", [userId, Timestamp(), text]);
        
                connection.end();
            
                res.status(201).json({message: "todo add"});
        
            }
    
        }catch(error){
            console.log(error);
            res.status(500).json({error: "unknown error"});
    
        }

    }else{

        res.status(403).json({error: "all fields must be filled"});

    }

}