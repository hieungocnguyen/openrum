import Layout from "../../components/Layout";
import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi2";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";

const DetailPost = (props) => {
   const { post } = props;
   const router = useRouter();
   const { _id } = router.query;
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const [isBookmark, setIsBookmark] = useState(false);
   const SubmitBookMark = async () => {
      if (userInfo) {
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
            setIsBookmark(true);
         } catch (error) {
            console.log(error);
         }
      } else {
         router.push("/login");
      }
   };
   const SubmitRemoveBookMark = async () => {
      try {
         const res = await axios.post(
            "/api/user/removebookmark",
            {
               postID: _id,
            },
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );
         setIsBookmark(false);
      } catch (error) {
         console.log(error);
      }
   };
   const fetchUserBookmark = async () => {
      const { data } = await axios.get("http://localhost:3000/api/user", {
         headers: { authorization: `Bearer ${userInfo.token}` },
      });
      data.bookmark.map((i) => {
         if (i.postID === _id) {
            setIsBookmark(true);
         }
      });
   };
   useEffect(() => {
      if (userInfo) {
         fetchUserBookmark();
      }
   }, [isBookmark]);

   return (
      <Layout>
         <div className="min-h-full bg-white dark:bg-dark-primary background_dropback p-5">
            <div className="w-full h-60 overflow-hidden rounded-md flex items-center">
               <img src={post.image} alt="thumbnail" className="w-full" />
            </div>
            <div className="mx-4">
               <div className="text-4xl font-extrabold my-4">
                  {post.subject}
               </div>
               <div className="my-2">{post.author}</div>
               {/* content post */}
               <div>{post.content}</div>
               {isBookmark ? (
                  <button
                     className="text-4xl text-light-primary"
                     onClick={SubmitRemoveBookMark}
                  >
                     <HiBookmark />
                  </button>
               ) : (
                  <button
                     className="text-4xl text-light-primary"
                     onClick={SubmitBookMark}
                  >
                     <HiOutlineBookmark />
                  </button>
               )}
            </div>
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
