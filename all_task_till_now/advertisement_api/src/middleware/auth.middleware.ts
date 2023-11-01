import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { createClient } from "redis";
import Session  from "../database/models/session.model";

const client = createClient()

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
export default  async function auth(req:Request,res:Response,next:NextFunction){
    const token: any = req.headers.authorization;
    if(!token) return res.status(401).send("ACCESS_DENIED");

    try{
        const decoded: any = jwt.verify(token,'appinventiv')
        console.log('token ', decoded);
        console.log('session_id' , decoded.session_id);
        
        const findSession:any = await client.get(`${decoded.id}_${decoded.session_id}`) || await Session.findOne({where: {id: decoded.session_id}});
        
        if(findSession.isActive===false){
            return res.status(400).send("Session out");
        }
        req.body.id = decoded.id
        console.log('123456jhgfds',req.body.id);
        
        req.body.session_id = decoded.session_id
        next();
        
    }catch(err:any){
        res.status(400).send("INVALID_TOKEN")
    }
}