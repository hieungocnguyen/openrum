import Layout from "../../components/Layout";
import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi2";
import axios, { AxiosHeaders } from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import dynamic from "next/dynamic";
import Link from "next/link";

const DetailPost = (props) => {
   const { post } = props;
   const router = useRouter();
   const { _id } = router.query;
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const [isBookmark, setIsBookmark] = useState(false);
   const [content, setContent] = useState("");
   const [reviews, setReviews] = useState([]);
   const [comment, setComment] = useState("");
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
            fetchUserBookmark();
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
         fetchUserBookmark();
      } catch (error) {
         console.log(error);
      }
   };
   const SubmitComment = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(
            `/api/post/${_id}/review`,
            { comment: comment },
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );
         fetchPost();
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
   const fetchPost = async () => {
      const { data } = await axios.get(`/api/post/${_id}`);
      setContent(data.content);
      setReviews(data.reviews);
      console.log(data.reviews);
   };

   useEffect(() => {
      if (userInfo) {
         fetchUserBookmark();
      }
      fetchPost();
   }, []);

   return (
      <Layout>
         <div className="min-h-full bg-white dark:bg-dark-primary background_dropback p-5">
            <div className="w-full h-60 overflow-hidden rounded-md flex items-center">
               <img src={post.image} alt="thumbnail" className="w-full" />
            </div>
            <div className="mx-4 ">
               <div className="text-4xl font-extrabold my-4">
                  {post.subject}
               </div>
               <div className="my-4 dark:text-light-primary text-black">
                  👉 {post.authorName}
               </div>
               {/* content post */}
               <div dangerouslySetInnerHTML={{ __html: `${content}` }} />

               {/* comment */}
               <div>
                  {isBookmark ? (
                     <div className="flex justify-center">
                        <button
                           className="text-4xl text-light-primary mt-8"
                           onClick={SubmitRemoveBookMark}
                        >
                           <HiBookmark />
                        </button>
                     </div>
                  ) : (
                     <div className="flex justify-center">
                        <button
                           className="text-4xl text-light-primary mt-8"
                           onClick={SubmitBookMark}
                        >
                           <HiOutlineBookmark />
                        </button>
                     </div>
                  )}
                  <div className="my-4 text-xl font-semibold">Comment</div>
                  {userInfo ? (
                     <div>
                        <form
                           onSubmit={SubmitComment}
                           className="grid grid-cols-5 mb-4"
                        >
                           <input
                              type="text"
                              required
                              onChange={(e) => setComment(e.target.value)}
                              className="py-3 px-5 col-span-4 rounded-l-lg outline-none"
                           />
                           <button
                              type="submit"
                              className="col-span-1 bg-light-primary text-black rounded-r-lg font-semibold"
                           >
                              Send
                           </button>
                        </form>
                     </div>
                  ) : (
                     <div>
                        <Link href={"/login"}>
                           <span className="text-light-primary">Log in</span>
                        </Link>{" "}
                        to comment
                     </div>
                  )}
                  {reviews.map((r) => (
                     <div key={r._id} className="flex gap-2 mt-4 ml-4">
                        <div className="font-semibold">{r.name}:</div>
                        <div>{r.comment}</div>
                     </div>
                  ))}
               </div>
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
         post: JSON.parse(JSON.stringify(post)),
      },
   };
}
// export default dynamic(() => Promise.resolve(DetailPost), { ssr: false });
