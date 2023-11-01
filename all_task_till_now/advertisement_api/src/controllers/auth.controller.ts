import User from "../database/models/user.model";
import Session from "../database/models/session.model";
import bcrypt from 'bcrypt';
import { createClient } from "redis";
import jwt from 'jsonwebtoken';

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

class AuthController {

    async signup(req:any, res:any) {
        try {
            const {name, username, email, password } = req.body;
            const check1:any = await User.findOne({where:{username: username}});
            const check2:any = await User.findOne({where:{email: email}});
            if (!check1 && !check2){
                const hashPwd = await bcrypt.hash(password,3);
                console.log(hashPwd);
                const result = await User.create({name: name, username: username, email:email, password:hashPwd});
                console.log('Signup successfully',result);
                return res.status(200).json({message: "OK"});
            }
            else if (check1 || check2){
                return res.status(400).json({message: "Username or email already exist"});
            }
        } catch(err) {
            console.error(err);
        }
    }

    async login(req:any, res:any) {
        try {
            const { email, password } = req.body;
            const result = await User.findOne({where:{email: email}})
            
            if(!result) {
                return res.status(200).json({message: "Wrong user"});
            }
            const pwdMatch = await bcrypt.compare(password, result.password)
            if(pwdMatch) {
                console.log('Login result',result);
                let session_payload={
                    user_id:result.id,
                    device_id:"1234",
                    device_type:"google chrome",
                    isActive: true
                }

                await Session.create(
                    session_payload
                )

                const a= await Session.max('id');  
                         
                const token = jwt.sign({id:result.id,session_id: a},'appinventiv',{expiresIn: '24h'});
                console.log(token);
                
                await client.set(`${result.id}_${a}`,JSON.stringify(session_payload))
                return res.send({message:"User Login Succesfully",token:token})
            }
            return res.status(400).json({message: "Incorrect Password"});
        } catch(err) {
            console.error(err);
        }
    }

    async logout(req:any, res:any) {
        try {
            const user_id = req.body.id;

            const session_id = req.body.session_id;

            const result = await Session.update({isActive: false,},{where: {id:session_id}});
            await client.DEL(`${user_id}_${session_id}`)
            console.log('Logout',result);
            return res.status(200).send('Logout');
        } catch(err) {
            console.error(err);
        }
    }

    async forgetPassword(req:any, res:any) {
        try {
            const {email} = req.body;
            const result: any = await User.findOne({where:{email: email}});
            if(!result) {
                return res.status(200).json({message: "Wrong user"});
            }
            console.log(result.id);
            
            const token = jwt.sign({id:result.id},'appinventiv',{expiresIn: "1h"});
            console.log('Set new password towen',token);
            return res.status(200).send(token);

        } catch(err) {
            console.error(err);
        }
    }

    async setNewPassword(req:any, res:any) {
        const token: any = req.headers.authorization;
        if(!token) return res.status(401).send("ACCESS_DENIED");
        try {
            const decoded: any = jwt.verify(token,'appinventiv');
            const user_id = decoded.id
            const {newPassword} = req.body;
            const hashPwd = await bcrypt.hash(newPassword,3);
            const result = await User.update({password: hashPwd,},{where: {id:user_id}});
            console.log('Password reset',result);
            return res.status(200).send('Password reset');
            
        } catch(err) {
            console.error(err);
            res.status(400).send("Invalid token")
        }
    }

}

export const authController = new AuthController();