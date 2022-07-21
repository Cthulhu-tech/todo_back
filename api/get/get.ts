import { ChechAuthorization } from "../utils/token/checkAuth";
import { connectDB } from "../utils/dbConnect/connect";
import { Request, Response } from "express";
import { ITodoData } from "../interface/db";

export const get = async (req:Request, res:Response) => {

    const userId = ChechAuthorization(req, res);

    try{

        if(userId){

            const connection = await connectDB();
    
            const todo_completed = await connection.query<ITodoData[]>("SELECT * FROM todo WHERE user_id = ? AND completed = 1", [userId]);
            const todo_pendings = await connection.query<ITodoData[]>("SELECT * FROM todo WHERE user_id = ? AND completed = 0", [userId]);
    
            connection.end();
        
            res.status(200).json({userData: {todo_completed: todo_completed[0], todo_pendings: todo_pendings[0]}});
    
        }

    }catch(error){

        res.status(500).json({error: "unknown error"});

    }

}