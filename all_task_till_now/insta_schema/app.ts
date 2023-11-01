import express, { Express } from "express";
import { authRouter } from "./src/routes/auth.route";
import { postRouter } from "./src/routes/post.route";
import { followRouter } from "./src/routes/follow_info.route";
import { actionRouter } from "./src/routes/actions.route";
import { replyRouter } from "./src/routes/comment_reply.route";
import connect from "./src/database/db_connection";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import options from "./swagger";
// import * as YAML from "yamljs";
// import * as path from 'path';
connect;
const app:Express = express();
app.use(express.json());
// const port = 6000;
app.use("/auth", authRouter);
app.use("/upload", postRouter);
app.use("/data", followRouter);
app.use("/data", actionRouter);
app.use("/data", replyRouter);

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });


app.listen(3000,()=>{
   const specs = swaggerJsdoc(options);
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );
  console.log("server are running on port 3000")
    })
