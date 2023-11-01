import User from "../database/models/user.model";
import bcrypt from 'bcrypt';
import fs from "fs";
import Address from "../database/models/address.model";
import Product from "../database/models/product.model";
import Image from "../database/models/image.model";
import { createClient } from "redis";
import Session from "../database/models/session.model";

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

class DashboardController {

    async uploadProfilePhoto(req:any, res:any) {
        try {
            const user_id = req.body.id;
            console.log(req.file.buffer);
            const file = req.file;
            const fileData = fs.readFileSync(file.path);
            const bufferData = Buffer.from(fileData);
            console.log(bufferData);
            console.log("12345678",user_id);
            const result = await User.update({ image: bufferData }, { where: {id: user_id } });
            const path1 = '/home/appinventiv/Desktop/advertisement_system/src/uploads/photo.png';
            fs.unlink(path1, (data) => {
                console.log("File deleted");
            });
            return res.status(200).send("Profile Uploaded");    
        } catch(err) {
            console.error(err);
            return res.status(200).send("Profile is not uploaded due to some error"); 
        }
    }

    async updateProfile(req:any, res:any) {
        try {
            const user_id = req.body.id
            const {name, username, email, password, gender, ph_no} = req.body;
            await User.update({name:name,username:username,email:email, gender:gender,ph_no:ph_no},{where: {id:user_id}});
            return res.status(200).send('Profile updated');

        } catch(err) {
            console.error(err);
            return res.status(400).send('Please provide proper information');
        }
    }

    async addAddress(req:any, res:any) {
        try {
            const user_id = req.body.id
            const {house_no, street_no, area, landmark, city, state, country, zip_code} = req.body;
            const result = await Address.create({house_no: house_no,street_no:street_no, area:area,landmark:landmark,city:city,state:state,country:country,zip_code:zip_code,user_id:user_id});
            console.log('Address is added',result);
            return res.status(200).json({message: "Address is added"});
            
        } catch(err) {
            console.error(err);
            return res.status(200).json({message: "Give proper detail"});
        }
    }

    async updatePassword(req:any, res:any) {
        try {
            const user_id = req.body.id
            const { password} = req.body;
            const hashPwd = await bcrypt.hash(password,3);
            await User.update({password:hashPwd},{where: {id:user_id}});
            return res.status(200).send('password updated');

        } catch(err) {
            console.error(err);
            return res.status(400).send('Server problem');
        }
    }

    async updateAddress(req:any, res:any) {
        try {
            const user_id = req.body.id
            const {house_no, street_no, area, landmark, city, state, zip_code} = req.body;
            await User.update({house_no: house_no,street_no:street_no, area:area,landmark:landmark,city:city,state:state,zip_code:zip_code},{where: {id:user_id}});
            return res.status(200).send('Address updated');

        } catch(err) {
            console.error(err);
            return res.status(400).send('Please provide proper information');
        }
    }

    async deleteAddress(req:any, res:any) {
        try {
            const {address_id} = req.body;
            const user_id = req.body.id
            await Address.destroy({where:{id:address_id,user_id:user_id}})
            return res.status(200).send('address deleted');

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong address id');
        }
    }

    async allAddress(req:any, res:any) {
        try {
            const user_id = req.body.id
            const result = await Address.findAll({where:{user_id:user_id}})
            console.log(result)
            return res.status(200).json({result});

        } catch(err) {
            console.error(err);
            return res.status(400).send('Server problem');
        }
    }

    async viewProfile(req:any, res:any) {
        try {
            const user_id = req.body.id
            const result = await User.findOne({where:{user_id:user_id}})
            console.log(result)
            return res.status(200).json({result});

        } catch(err) {
            console.error(err);
            return res.status(400).send('Server problem');
        }
    }

    async deleteAccount(req:any, res:any) {
        try {
            const user_id = req.body.id;
            const session_id = req.body.session_id;
            
            await User.destroy({where:{id:user_id}})
            await Session.update({isActive: false,},{where: {id:session_id}});
            await client.DEL(`${user_id}_${session_id}`)
            try {
                await Address.destroy({where:{user_id:user_id}})
                await Product.destroy({where:{user_id:user_id}})
                await Image.destroy({where:{user_id:user_id}})
            } catch (error) {
                return res.status(200).send('Account removed');
            }
            return res.status(200).send('Account removed');
        } catch(err) {
            console.error(err);
            return res.status(400).send('Account is not deleted due to error');
        }
    }
}

export const dashboardController = new DashboardController();