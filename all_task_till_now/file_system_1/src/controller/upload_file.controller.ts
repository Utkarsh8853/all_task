import multer from 'multer';

class FileUploader {
  uploading = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads');
      },
      filename: function (req, file, cb) {
        cb(null, `message${file.fieldname}.txt`);
      }
    })
  }).any();
}

export default new FileUploader();


















// import multer from 'multer';
// class UploadController {

//     async upload(req:any, res:any) {
//         console.log("hivrgfi");
//         try {
//             console.log("hi555555555i");
//             const upload = multer({
//                 storage: multer.diskStorage({
//                     destination: function (req, file, cb) {
//                         cb(null, '../../uploads/');
//         res.status(200).send("file uploaded");
//                         console.log("hii");
//                     },
//                     filename: function (req, file, cb) {
            
//                         cb(null, `message${file.fieldname}.txt`);
//                         console.log("hello");
//                     }
//                 })
//             }).any();
//         } catch(err) {
//             console.error(err);
//             res.status(400).send("server promble");
//         }
//     }
// }

// export const uploadController = new UploadController();