import { User } from "../database/models/users.model";
class AuthController {

    async signup(req:any, res:any) {
        try {
            const { username, email, password } = req.body;
            const result = await User.create({username, email, password});
            if(result) {
                console.log('Signup successfully',result);
                return res.status(200).json({message: "OK"});
            }
            return res.status(400).json({message: "server problem"});
        } catch(err) {
            console.error(err);
        }
    }

    async login(req:any, res:any) {
        try {
            const { username, password } = req.body;
            const result = await User.findOne({where: {username: username, password: password}});
            if(result) {
                console.log('Login result',result);
                return res.status(200).json({message: "OK Login"});
            }
            return res.status(400).json({message: "Incorrect Password"});
        } catch(err) {
            console.error(err);
        }
    }
}

export const authController = new AuthController();