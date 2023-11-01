import { group_member } from "../database/models/group_member.model";
class GroupMemberController {

    async group_member(req:any, res:any) {
        try {
            const { user_id, group_id } = req.body;
            const result = await group_member.create({user_id, group_id});
            if(result) {
                console.log('Member added',result);
                return res.status(200).json({message: "Member added"});
            }
            return res.status(400).json({message: "incorrect id"});
        } catch(err) {
            console.error(err);
        }
    }

}

export const groupMemberController = new GroupMemberController();