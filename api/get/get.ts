import { connectDB } from "../utils/dbConnect/connect";
import { Request, Response } from "express";

export const get = async (req:Request, res:Response) => {

    await connectDB();

}