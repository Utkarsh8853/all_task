import express from "express";

import FileUploader from "../controller/upload_file.controller";

export const uploadRouter = express.Router();

uploadRouter.post('/upload', FileUploader.uploading, (req,res) =>{
    res.status(200).send("file uploaded");
});