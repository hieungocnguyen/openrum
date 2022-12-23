import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import nc from "next-connect";

cloudinary.config({
   cloud_name: "ngnohieu",
   api_key: "282778813415912",
   api_secret: "YE8mtIG7FQfE71Z09Xqt5kV2l3Y",
});

export const config = {
   api: {
      bodyParser: false,
   },
};
const handler = nc();
const upload = multer();

handler.use(upload.single("file")).post(async (req, res) => {
   const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
         const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
               resolve(result);
            } else {
               reject(error);
            }
         });
         streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
   };
   const result = await streamUpload(req);
   res.send(result);
});

export default handler;
