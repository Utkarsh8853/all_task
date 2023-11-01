import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { uploadRouter } from './src/routes/upload_files.route';
import { mergedRouter } from './src/routes/merge_file.route';

const app:Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded( {extended: true} ));

const port = 6000;
const hostname = "127.0.0.1";

app.get("/", (req,res) => {
    res.send("Express + TypeScript Server");
});

app.use("/file", uploadRouter);
app.use("/file", mergedRouter);

app.listen(port, hostname, () => {
  console.log(`Server started on port ${port}`);
});