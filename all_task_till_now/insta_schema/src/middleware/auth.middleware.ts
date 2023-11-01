import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { createClient } from "redis";
import sessionModel  from "../database/models/session.model";

const client = createClient()

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
export default  async function auth(req:Request,res:Response,next:NextFunction){
    const token: any = req.headers.authorization;
    const verifyToken :any = jwt.verify(token,'appinventiv');
    
    if(verifyToken.id){
        let findSession:any = await client.get(`${verifyToken.id}_session`) || await sessionModel.find(verifyToken.id)

        if(findSession.length!=0){
            req.body.id= verifyToken.id;
            next()
        }else{
            res.send("Session out")
        }


    }else{
        res.send({message:"invalid token"})
    }

}