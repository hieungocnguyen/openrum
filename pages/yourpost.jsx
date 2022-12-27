/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import PostGrid from "../components/PostGrid";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi";
import image from "../public/noData.png";

const YourPost = () => {
   const [posts, setPosts] = useState([]);
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const fetchPosts = async () => {
      const { data } = await axios.get("/api/user/posts", {
         headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setPosts(data);
   };
   const handleDelete = async (PostID) => {
      try {
         const res = await axios.delete(`/api/post/${PostID}`);
      } catch (err) {
         console.log("Delete Failed");
      }
   };
   useEffect(() => {
      fetchPosts();
   }, []);

   return (
      <Layout>
         <div className="font-extrabold text-3xl my-4">Your Post</div>
         {/* <PostGrid posts={posts} /> */}
         {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-4">
               {posts.map((p) => (
                  <div key={p._id}>
                     <Link href={`/post/${p._id}`}>
                        <div className="h-80 bg-white dark:bg-dark-primary background_dropback p-4">
                           {p.image ? (
                              <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md overflow-hidden flex items-center ">
                                 <img
                                    src={p.image}
                                    alt="img"
                                    className="h-full w-full"
                                 />
                              </div>
                           ) : (
                              <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
                           )}
                           <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                              {p.subject}
                           </div>
                           <div className="absolute bottom-2 ">
                              {p.authorName} |{" "}
                              <span className="dark:text-light-primary text-black ">
                                 {p.category}
                              </span>
                           </div>
                           <div
                              className="absolute right-2 bottom-2 text-3xl text-red-600 hover:bg-red-800 p-1 rounded-sm"
                              onClick={handleDelete(p._id)}
                           >
                              <HiOutlineTrash />
                           </div>
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex flex-col justify-center items-center">
               <Image
                  src={image}
                  alt="nothing here"
                  className="w-52 mt-14 mb-2"
               />
            </div>
         )}
      </Layout>
   );
};

export default YourPost;
