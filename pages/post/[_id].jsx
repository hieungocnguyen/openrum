import Layout from "../../components/Layout";
import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";
import { HiOutlineBookmark } from "react-icons/hi";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../../utils/Store";

const DetailPost = (props) => {
   const { post } = props;
   const router = useRouter();
   const { _id } = router.query;
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const SubmitBookMark = async () => {
      try {
         const res = await axios.post(
            "/api/user/bookmark",
            {
               postID: _id,
            },
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );
         console.log(res);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Layout>
         <div className="min-h-full bg-white dark:bg-dark-primary background_dropback p-5">
            <div className="w-full h-60 overflow-hidden rounded-md flex items-center">
               <img src={post.image} alt="thumbnail" className="w-full" />
            </div>
            <div className="text-4xl font-extrabold">{post.subject}</div>
            <div className="">{post.author}</div>
            {/* content post */}
            <div>{post.content}</div>
            <button className="text-3xl" onClick={SubmitBookMark}>
               <HiOutlineBookmark />
            </button>
         </div>
      </Layout>
   );
};

export default DetailPost;

export async function getServerSideProps(context) {
   const { params } = context;
   const { _id } = params;

   await dbConnect.connect();
   const post = await Post.findOne({ _id }).lean();
   await dbConnect.disconnect();
   return {
      props: {
         post: dbConnect.convertDocToObj(post),
      },
   };
}
