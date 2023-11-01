import { group_message } from "../database/models/group_chat.model";
class DeleteController {

    async delete_all_chats(req:any, res:any) {
        try {
            const { group_id} = req.body;
            const isGroup = await group_message.findOne({where: {group_id: group_id}});
            if (!isGroup) {
            return res.status(403).json({ message: 'There is no such group.' });
            }
            await group_message.destroy({
                where: { group_id: group_id }
              });
            res.status(200).json({message: `All messages deleted group_id ${group_id}`});
        } catch(err) {
            console.error(err);
        }
    }

}

export const deleteController = new DeleteController();