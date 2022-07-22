const { sign } = require('jsonwebtoken');

export const createAccessToken = (userId:number, time:string) => {

    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {

      expiresIn: time,

    });
    
};