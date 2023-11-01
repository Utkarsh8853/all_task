import { group } from "../database/models/groups.model";
class GroupController {

    async group(req:any, res:any) {
        try {
            const { id, name, photo, description, created_by } = req.body;
            const result = await group.create({id, name, photo, description, created_by});
            if(result) {
                console.log('Group created',result);
                return res.status(200).json({message: "Group created"});
            }
            return res.status(400).json({message: "server problem"});
        } catch(err) {
            console.error(err);
        }
    }

}

export const groupController = new GroupController();