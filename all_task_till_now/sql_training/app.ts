import express, { Express } from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import { authRouter } from './src/routes/auth.route';
import { groupRouter } from './src/routes/group.route';
import { groupMemberRouter } from './src/routes/group_member.route';
import { groupChatRouter } from './src/routes/group_chat.route';
import { groupChatMessagesRouter } from './src/routes/group_chat_messages.route';
import { deleteAllMessagesRouter } from './src/routes/delete_all_messages.route';
//import User from './src/database/models/users.model';
// import group from './src/database/models/groups.model';
// import group_message from './src/database/models/group_message.model';

// (async ()  => {
//   await User.sync();
//   await group.sync();
//   await group_message.sync();
// })();

const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded( {extended: true} ));

const port = 6000;
const hostname = "127.0.0.1";

app.get("/", (req,res) => {
    res.send("Express + TypeScript Server");
});

app.use("/auth", authRouter);
app.use("/data", groupRouter);
app.use("/add", groupMemberRouter);
app.use("/write", groupChatRouter);
app.use("/read", groupChatMessagesRouter);
app.use("/remove", deleteAllMessagesRouter);

app.listen(port, hostname, () => {
  console.log(`Server started on port ${port}`);
});