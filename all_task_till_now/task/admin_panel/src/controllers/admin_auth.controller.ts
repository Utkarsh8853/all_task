import { Request,Response } from "express";
import { LoginTicket, OAuth2Client } from 'google-auth-library'
import { googleConfig } from "../../envConfig";
import {redis} from "../database/redis.db";
import { adminAuthService } from "../services/admin_auth.service";
import { AdminAuthRequest } from "../interfaces/customRequest.interface";
import Admin from "../database/models/postgresSQL/admin.model";

const connect = new OAuth2Client(googleConfig.CLIENT_ID,googleConfig.CLIENT_SECRET,googleConfig.CLIENT_REDIRECT_ADMIN_URI);

class AdminAuthController {

    async signin(req:Request, res:Response) {
        try {
            const url = connect.generateAuthUrl({
                access_type: 'offline',
                scope: ['email', 'profile'],
                redirect_uri: googleConfig.CLIENT_REDIRECT_ADMIN_URI,
              });
              
              res.redirect(url);
        } catch(err) {
            console.error(err);
        }
    }

    async signinCallback(req:Request, res:Response) {
        try {
            const { code } = req.query;
            const { tokens } = await connect.getToken(code as string);
            console.log("token",tokens);
            const ticket:LoginTicket = await connect.verifyIdToken({
                idToken: tokens.id_token as string,
                audience: googleConfig.CLIENT_ID,
            });
            console.log("ticket",ticket);
            connect.revokeToken(tokens.access_token as string);
            const payload = ticket.getAttributes().payload?.email as string
            const verifyUser = await adminAuthService.verifyUsersEmail(payload) 
            console.log("////////////",verifyUser);
            
            if (verifyUser){
                const jwtToken = await adminAuthService.userLoginbyThirdParty(verifyUser.id);
                console.log('Signup successfully',jwtToken);
                return res.status(200).send(`Welcome ${ticket.getAttributes().payload?.name} your jwt token is  "${jwtToken}"`);
            }
        } catch(err) {
            console.error(err);
            res.status(401).json({ error: 'Invalid user' });
        }
    }

    async twilioSignin(req:Request, res:Response) {
        try {
            const { ph_no } = req.body;
            await adminAuthService.userSigninByPh_no(ph_no)
            return res.status(200).send(`Verification code sent to ${ph_no}`);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error sending verification code');
        }
    }

    async otpVerification(req:Request, res:Response) {
        try {
            const { ph_no, otp} = req.body;
            const storedOtp:boolean = await adminAuthService.otpVerification(ph_no,otp.toString());
            if (storedOtp) {
                const verifyUser = await adminAuthService.verifyUserPh_no(ph_no);
                if (verifyUser){
                    const jwtToken = await adminAuthService.userLoginbyThirdParty(verifyUser.id);
                    console.log('Signup successfully',jwtToken);
                    await redis.delKey(`${ph_no}__otp`)
                    return res.status(200).send(`Welcome ${verifyUser.name} your jwt token is  "${jwtToken}"`);
                }
                return res.status(200).send('Phone number verified');
            } else {
                res.status(400).send('Invalid verification code');
            }
          } catch (error) {
                console.error(error);
                res.status(500).send('Error verifying phone number');
          }
    }

    async login(req:Request, res:Response) {
        try {
            const { email, password } = req.body;
            const verifyUser = await adminAuthService.verifyUsersEmail(email);
            
            if(!verifyUser) {
                return res.status(200).json({message: "Wrong user"});
            }
            const pwdMatch = await adminAuthService.matchPwd(password, verifyUser.password as string);
            if(pwdMatch) {
                const sessionId = await adminAuthService.sessionCreation(verifyUser.id)
                console.log('Login result',verifyUser); 

                const token = adminAuthService.tokenGenration(verifyUser.id,sessionId);
                console.log('token ',token);

                await adminAuthService.redisSessionCreation(verifyUser.id,sessionId)

                return res.send({message:"User Login Succesfully",token:token})
            }
            return res.status(400).json({message: "Incorrect Password"});
        } catch(err) {
            console.error(err);
        }
    }

    async logout(req:Request, res:Response) {
        try {
            const userData = (req as AdminAuthRequest).userData;
            const user_id = userData.id;
            const session_id = userData.session_id;
            console.log("Local object : ", userData);
            const result = await adminAuthService.userLogout(user_id,session_id)
            console.log('Logout',result);
            return res.status(200).send('Logout');
        } catch(err) {
            console.error(err);
        }
    }

    async forgetPassword(req:Request, res:Response) {
        try {
            const {email} = req.body;
            const userEmail = await adminAuthService.verifyUsersEmail(email)
            if(!userEmail) {
                return res.status(200).json({message: "Wrong user"});
            }
            const response = await adminAuthService.forgetPwdToken(email,userEmail.name)
            return res.status(200).send(`${response} ${email}`);

        } catch(err) {
            console.error(err);
        }
    }

    async setNewPassword(req:Request, res:Response) {
        try {
            console.log(req.body);
            const {email,otp,newPassword} = req.body;
            const result = await adminAuthService.setPwd(email,otp,newPassword)
            console.log(result);
            return res.status(200).send(result);
        } catch(err) {
            console.error(err);
            res.status(400).send("incorrect otp")
        }
    }
}

export const adminAuthController = new AdminAuthController();