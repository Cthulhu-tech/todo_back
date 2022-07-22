import { ChechAuthorization } from "../utils/token/checkAuth";
import { connectDB } from "../utils/dbConnect/connect";
import { Request, Response } from "express";

export const deleteTodo = async (req:Request, res:Response) => {

    const {id} = req.body;
    console.log(req)
    if(!!id){

        const userId = ChechAuthorization(req, res);

        try{
    
            if(userId){
    
                const connection = await connectDB();
                
                await connection.query("DELETE FROM `todo` WHERE `todo`.`id` = ?", [id]);
        
                connection.end();
            
                res.status(202).json({message: "todo delete"});
        
            }
    
        }catch(error){

            console.log(error);

            res.status(500).json({error: "unknown error"});
    
        }

    }else{

        res.status(403).json({error: "delet error"});

    }

}