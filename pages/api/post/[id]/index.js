// get by Id, update, delete post
import nc from "next-connect";
import Post from "../../../../models/Post";
import dbConnect from "../../../../utils/dbConnect";

const handler = nc();

handler.get(async (req, res) => {
   await dbConnect.connect();
   const post = await Post.findById(req.query.id);
   await dbConnect.disconnect();
   res.send(post);
});

export default handler;
