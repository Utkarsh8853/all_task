import { group_message } from "../database/models/group_chat.model";
import { group_member } from "../database/models/group_member.model";
class GroupChatController {

    async group_chat(req:any, res:any) {
        try {
            const {group_id, sender_id, message_text} = req.body;
            const isMember = await group_member.findOne({where: {user_id: sender_id}});
            if (!isMember) {
            return res.status(403).json({ message: 'You are not a member of this group chat.' });
            }
            const result = await group_message.create({group_id, sender_id, message_text});
            if(result) {
                console.log('Message sent',result);
                return res.status(200).json({message: "Message sent"});
            }
            return res.status(400).json({message: "input valid detail"});
        } catch(err) {
            console.error(err);
        }
    }

}

export const groupChatController = new GroupChatController();