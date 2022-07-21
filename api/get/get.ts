import { connectDB } from "../utils/dbConnect/connect";
import { Request, Response } from "express";

export const get = async (req:Request, res:Response) => {

    const connection = await connectDB();
    await connection.end();
    res.json(    {userData: {todo_pendings: "pendings", todo_completed: "completed"}})

}