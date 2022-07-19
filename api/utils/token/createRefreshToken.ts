import { sign } from "jsonwebtoken";

export const createRefreshToken = (userId:number, time:string) => {
    
    return sign({ userId }, (process.env.REFRESH_TOKEN_SECRET as string), {
  
      expiresIn: time,
  
    });
}
