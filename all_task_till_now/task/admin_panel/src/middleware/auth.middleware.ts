import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { redis } from "../database/redis.db";
import Session from "../database/models/postgresSQL/session.model";
import { deliveryConfig, jwtConfig } from "../../envConfig";
import { AdminAuthRequest, UserAuthRequest} from "../interfaces/customRequest.interface";


export async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;//?.split(" ")[1];
    if (!token) return res.status(401).send("ACCESS_DENIED");
    try {
        const decoded = jwt.verify(token, jwtConfig.JWT_TOKEN_CODE) as jwt.JwtPayload
        console.log('token ', decoded);
        const parser = await redis.getKey(`${decoded.id}_${decoded.session_id}`) as string
        const findSession = JSON.parse(parser) || await Session.findOne({ where: { id: decoded.session_id } });
        if (findSession.isActive === false) {
            return res.status(400).send("Session out");
        }
        if (decoded.baseUrl !== "/buyer" && decoded.baseUrl !== "/seller") {
            return res.status(400).send("You don't access this route");
        }
        (req as UserAuthRequest).userData = {
            id: decoded.id,
            role: decoded.baseUrl,
            session_id: decoded.session_id
        };
        next();
    } catch (err) {
        const decoded = jwt.decode(token)
        console.log('Expired token ', decoded);
        return res.status(400).send("INVALID_TOKEN")
    }
}

export async function buyerAccess(req: Request, res: Response, next: NextFunction) {
    const token= req.headers.authorization;
    if (!token) return res.status(401).send("ACCESS_DENIED");
    try {
        const decoded= jwt.verify(token, jwtConfig.JWT_TOKEN_CODE) as jwt.JwtPayload
        console.log('token ', decoded);
        const parser = await redis.getKey(`${decoded.id}_${decoded.session_id}`) as string
        const findSession = JSON.parse(parser) || await Session.findOne({ where: { id: decoded.session_id } });
        if (findSession.isActive === false) {
            return res.status(400).send("Session out");
        }
        if (decoded.baseUrl !== "/buyer") {
            return res.status(400).send("You don't access this route");
        }
        (req as UserAuthRequest).userData = {
            id: decoded.id,
            role: decoded.baseUrl,
            session_id: decoded.session_id
        };
        next();

    } catch (err) {
        const decoded = jwt.decode(token)
        console.log('Expired token ', decoded);
        res.status(400).send("INVALID_TOKEN")
    }
}

export async function sellerAccess(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("ACCESS_DENIED");
    try {
        const decoded = jwt.verify(token, jwtConfig.JWT_TOKEN_CODE) as jwt.JwtPayload
        console.log('token ', decoded);
        const parser = await redis.getKey(`${decoded.id}_${decoded.session_id}`) as string
        const findSession = JSON.parse(parser) || await Session.findOne({ where: { id: decoded.session_id } });
        if (findSession.isActive === false) {
            return res.status(400).send("Session out");
        }
        if (decoded.baseUrl !== "/seller") {
            return res.status(400).send("You don't access this route");
        }
        (req as UserAuthRequest).userData = {
            id: decoded.id,
            role: decoded.baseUrl,
            session_id: decoded.session_id
        };
        next();

    } catch (err) {
        const decoded = jwt.decode(token)
        console.log('token ', decoded);
        res.status(400).send("INVALID_TOKEN")
    }
}

export async function adminAccess(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("ACCESS_DENIED");
    try {
        const decoded = jwt.verify(token, jwtConfig.JWT_TOKEN_CODE) as jwt.JwtPayload
        const parser = await redis.getKey(`${decoded.id}_${decoded.session_id}`) as string
        const findSession = JSON.parse(parser) || await Session.findOne({ where: { id: decoded.session_id } });
        if (findSession.isActive === false) {
            return res.status(400).send("Session out");
        }
        if (decoded.baseUrl !== "/admin") {
            return res.status(400).send("You don't access this route");
        }
        (req as AdminAuthRequest).userData = {
            id: decoded.id,
            role: decoded.baseUrl,
            session_id: decoded.session_id
        };
        next();
    } catch (err) {
        const decoded = jwt.decode(token)
        console.log('token ', decoded);
        res.status(400).send("INVALID_TOKEN")
    }
}

export async function delvieryAccess(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("ACCESS_DENIED");
    try {
        if (token === deliveryConfig.DELIVERY_ACCESS_CODE)
            next();
    } catch (err) {
        res.status(400).send("INVALID_TOKEN")
    }
}