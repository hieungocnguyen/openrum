/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

const Bookmark = () => {
   const [posts, setPosts] = useState([]);
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const [tempPosts, setTempPosts] = useState([]);
   const fetchPostsID = async () => {
      const postsID = await axios.get("api/user/bookmark", {
         headers: { authorization: `Bearer ${userInfo.token}` },
      });
      postsID.data.map(async (i) => {
         const post = await axios.get(`api/post/${i.postID}`);
         setPosts((posts) => [...posts, post.data]);
      });
   };
   useEffect(() => {
      fetchPostsID();
   }, []);
   return (
      <Layout>
         <div>Your Bookmark</div>
         <div className="grid grid-cols-3 gap-4 mt-4">
            {posts.map((p) => (
               <div key={p._id}>
                  <Link href={`/post/${p._id}`}>
                     <div className="h-80 bg-white dark:bg-dark-primary background_dropback p-4">
                        {p.image ? (
                           <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md overflow-hidden flex items-center ">
                              <img src={p.image} alt="img" />
                           </div>
                        ) : (
                           <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
                        )}
                        <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                           {p.subject}
                        </div>
                        <div className=" mt-2 font-normal text-lg">
                           {p.author}
                        </div>
                     </div>
                  </Link>
               </div>
            ))}
         </div>
      </Layout>
   );
};

export default Bookmark;
