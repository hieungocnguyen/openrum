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
handler.delete(async (req, res) => {
   await dbConnect.connect();
   const post = await Post.findById(req.query.id);
   if (post) {
      await post.remove();
      await dbConnect.disconnect();
      res.send({ message: "Post Deleted" });
   } else {
      await dbConnect.disconnect();
      res.status(404).send({ message: "Post Not Found" });
   }
});

export default handler;
