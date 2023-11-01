import { Request } from "express";

export interface UserAuthRequest extends Request {
    userData:{
        id: string;
        role: string;
        session_id: number;
    }
}

export interface AdminAuthRequest extends Request {
    userData:{
        id: number;
        role: string;
        session_id: number;
    }
}