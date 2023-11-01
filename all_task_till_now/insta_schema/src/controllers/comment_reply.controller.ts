import Action, { type } from "../database/models/actions.model";
import Post from "../database/models/post.model";

class ReplyController {

    async reply(req:any, res:any) {
        try {
            
            const user_id= req.body.id;
            const { action_id, reply_text  } = req.body;
            const check1: any = await Action.findOne({ _id: action_id});
            if (check1) {
                if(reply_text === "" || reply_text === null){
                    return res.status(400).send("Reply content is empty")
                }
                const filter1 = { _id: action_id };
                const update1 = { $push: {reply:{action_id: action_id,user_id: user_id,reply_text:reply_text} }};
                await Action.updateOne(filter1,update1);
                return res.status(200).send("Reply done");
            }
            return res.status(400).send("Wrong action id");
        } catch(err) {
            console.error(err);
            return res.status(400).send("Server problem")
        }
    }

    async allReply(req:any, res:any) {
        try {
            const { action_id } = req.body;
            const check: any = await Action.findOne({ _id: action_id });
            console.log('check ', check)
            if(check){
                const result: any = await Action.find({ _id: action_id, action_type: type.Comment }).select('reply.reply_text');
                console.error(result);
                return res.status(400).json({result});
            }
            return res.status(400).send("Wrong post id")
        } catch(err) {
            console.error(err);
            return res.status(400).send("Server problem")
        }
    }

}

export const replyController = new ReplyController();