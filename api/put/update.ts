import { ChechAuthorization } from "../utils/token/checkAuth";
import { connectDB } from "../utils/dbConnect/connect";
import { ITodoDataCompleted } from "../interface/db";
import { Request, Response } from "express";

export const update = async (req:Request, res:Response) => {

    const { id } = req.body;

    if(!!id){

        const userId = ChechAuthorization(req, res);

        try{
    
            if(userId){
    
                const connection = await connectDB();

                const completed = await connection.query<ITodoDataCompleted[]>("SELECT completed FROM todo WHERE id = ?", [id]);
                
                await connection.query("UPDATE `todo` SET completed = ?  WHERE `todo`.`id` = ?", [completed[0][0].completed === 1 ? 0 : 1, id]);
        
                connection.end();
            
                res.status(202).json({message: "todo update"});
        
            }
    
        }catch(error){

            console.log(error);

            res.status(500).json({error: "unknown error"});
    
        }

    }else{

        res.status(403).json({error: "delet error"});

    }

}