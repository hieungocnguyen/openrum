import nc from "next-connect";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import { signToken } from "../../../utils/auth";
import { isAuth } from "../../../utils/auth";

const handler = nc();

handler.use(isAuth).get(async (req, res) => {
   await dbConnect.connect();
   const user = await User.findById(req.user._id);
   await dbConnect.disconnect();
   res.send(user);
});

export default handler;
