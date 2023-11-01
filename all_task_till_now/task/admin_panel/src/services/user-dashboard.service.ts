import bcrypt from 'bcrypt';
import {redis} from "../database/redis.db";
import Session from "../database/models/postgresSQL/session.model";
import addressModel from '../database/models/mongoDB/address.model';
import Address from '../database/models/postgresSQL/address.model';

class UserDashboardService {

    async updateUserProfile (model:any,field:any,user_id: string) {
        const userDetail = await model.updateOne({_id:user_id},{$set: {name:field.name,email:field.email,ph_no:field.ph_no}});
        return userDetail
    }

    async addressEntry (field:any,user_id: string) {
        const addAddress = await addressModel.create({house_no: field.house_no,street_no:field.street_no, area:field.area,city:field.city,state:field.state,country:field.country,zip_code:field.zip_code,user_id:user_id});
        return addAddress;
    }

    async updatePwd (model:any,user_id: string, password: string) {
        const hashPwd = await bcrypt.hash(password,3);
        await model.updateOne({_id:user_id},{$set: {password:hashPwd}});
    }

    async findAddress (address_id: string,user_id: string) {
        const address = await addressModel.findOne({_id:address_id,user_id:user_id})
        return address;
    }

    async updateUserAddress (field:any) {
        await addressModel.updateOne({_id:field._id},{$set:{house_no: field.house_no, street_no:field.street_no, area:field.area, city:field.city, state:field.state, country:field.country, zip_code:field.zip_code}},{new:true});
    }

    async deleteUserAddress (address_id: string,user_id: string) {
        await addressModel.deleteOne({_id:address_id,user_id:user_id})
    }

    async userAllAddress (model:any,user_id: string) {
        const result = await model.find({user_id: user_id});
        return result;
    }

    async viewUserProfile (model:any,user_id: string) {
        const result = await model.findOne({_id:user_id})
        return result
    }

    async removeAccount (model:any,user_id: string, session_id: number) {
        await model.deleteOne({_id:user_id})
        await Session.update({isActive: false,},{where: {id:session_id}});
        await redis.delKey(`${user_id}_${session_id}`)
        try {
            await Promise.all([
                addressModel.deleteMany({ user_id: user_id })
            ]);
        } catch (error) {}
    }
}
export const userDashboardervice = new UserDashboardService()