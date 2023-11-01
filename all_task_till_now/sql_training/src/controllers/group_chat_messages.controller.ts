import { group_message } from "../database/models/group_chat.model";
class GroupChatMessagesController {

    async group_chat_messages(req:any, res:any) {
        try {
            const {group_id} = req.body;
            const isGroup = await group_message.findOne({where: {group_id: group_id}});
            if (!isGroup) {
            return res.status(403).json({ message: 'There is no such group.' });
            }
            const messages = await group_message.findAll({
            where: { group_id: group_id},
            attributes: ['sender_id', 'message_text']
            });
            res.status(200).json({message: messages});
        
        } catch(err) {
            console.error(err);
        }
    }

}

export const groupChatMessagesController = new GroupChatMessagesController();