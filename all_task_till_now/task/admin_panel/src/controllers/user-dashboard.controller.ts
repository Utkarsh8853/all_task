import { Request,Response } from "express";
import { authService } from "../services/auth.service";
import { userDashboardervice } from "../services/user-dashboard.service";
import { UserAuthRequest } from "../interfaces/customRequest.interface";


class DashboardController {

    async updateProfile(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            const role = userData.role;;
            const modelName = await authService.checkModel(role)
            const {name,email,ph_no} = req.body;
            let userEmailExist:any
            let userNumberExist:any
            if(req.body.email){
                userEmailExist = await authService.verifyUserExist(modelName,email)
            } if(req.body.ph_no){
                userNumberExist = await authService.verifyUserPh_no(modelName,ph_no)
            }
            if(!userEmailExist && !userNumberExist){
                const userDetail = await userDashboardervice.updateUserProfile(modelName,req.body,user_id);
                console.log('Updated detail: ',userDetail);
                return res.status(200).json({'Profile updated':userDetail});
            } else if(((userEmailExist.id === user_id) && !userNumberExist) || ((userNumberExist.id === user_id) && !userEmailExist)){
                const userDetail = await userDashboardervice.updateUserProfile(modelName,req.body,user_id);
                console.log('Updated detail: ',userDetail);
                return res.status(200).json({'Profile updated':userDetail});
            } else {
                return res.status(200).json({'Account already exist on given number or mail id. If you want you can merge it ':userEmailExist,userNumberExist})
            }} catch(err) {
            console.error(err);
            return res.status(400).send('Please provide proper information');
        }
    }

    async addAddress(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            const userAddress = await userDashboardervice.addressEntry(req.body,user_id)
            console.log('Address is added',userAddress);
            return res.status(200).json({message: "Address is added"});
        } catch(err) {
            console.error(err);
            return res.status(200).json({message: "Give proper detail"});
        }
    }

    async updatePassword(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            const role = userData.role;
            const modelName = await authService.checkModel(role);
            const { password} = req.body;
            await userDashboardervice.updatePwd(modelName,user_id,password)
            return res.status(200).send('password updated');
        } catch(err) {
            console.error(err);
            return res.status(400).send('Server problem');
        }
    }

    async updateAddress(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            // const {house_no, street_no, area, landmark, city, state, country, zip_code, address_id} = req.body;
            const address = await userDashboardervice.findAddress(req.body.address_id,user_id);
            if(!address){
                return res.status(400).send('Wrong address id');
            }
            await userDashboardervice.updateUserAddress(req.body)
            return res.status(200).send('Address updated');
            } catch(err) {
            console.error(err);
            return res.status(400).send('Please provide proper information');
        }
    }

    async deleteAddress(req:Request, res:Response) {
        try {
            const {address_id} = req.body;
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            await userDashboardervice.deleteUserAddress(address_id,user_id);
            return res.status(200).send('address deleted');

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong address id');
        }
    }

    async allAddress(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            const role = userData.role;
            const modelName = await authService.checkModel(role);
            const addresses = await userDashboardervice.userAllAddress(modelName,user_id);
            console.log(addresses)
            return res.status(200).json({addresses});

        } catch(err) {
            console.error(err);
            return res.status(400).send('Server problem');
        }
    }

    async viewProfile(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            const role = userData.role;;
            const modelName = await authService.checkModel(role)
            const result = await userDashboardervice.viewUserProfile(modelName,user_id)
            console.log(result)
            return res.status(200).json({result});

        } catch(err) {
            console.error(err);
            return res.status(400).send('Server problem');
        }
    }

    async deleteAccount(req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;
            const session_id = userData.session_id;
            const role = userData.role;;
            const modelName = await authService.checkModel(role);
            await userDashboardervice.removeAccount(modelName,user_id,session_id);
            return res.status(200).send('Account removed');
        } catch(err) {
            console.error(err);
            return res.status(400).send('Account is not deleted due to error');
        }
    }
}

export const dashboardController = new DashboardController();