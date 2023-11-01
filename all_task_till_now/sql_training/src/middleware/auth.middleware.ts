import { NextFunction, Request, Response } from "express";
//import { ACCESS_DENIED, INVALID_TOKEN } from "../handlers/error";
import jwt from 'jsonwebtoken';

export default function auth(req:any,res:Response,next:NextFunction){

    const token = req.body.token
    if(!token) return res.status(401).send("ACCESS_DENIED");

    try{
        const decoded = jwt.verify(token,'jwtPrivateKey')
        req.user = decoded;
        next();
    }catch(err:any){
        res.status(400).send("INVALID_TOKEN")
    }

}