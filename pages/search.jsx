/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Search = () => {
   const [allPost, setAllPost] = useState([]);
   const [posts, setPosts] = useState([]);
   const [keyword, setKeyWord] = useState("");
   const fetchAllPost = async () => {
      const { data } = await axios.get("api/post");
      setAllPost(data);
   };
   useEffect(() => {
      fetchAllPost();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      setPosts([]);
      let temp = [];
      if (keyword) {
         allPost.map((p) => {
            if (p.subject.search(keyword) !== -1) {
               temp.push(p);
            }
         });
         setPosts(temp);
      } else {
         setPosts(allPost);
      }
   };
   return (
      <Layout>
         <form onSubmit={handleSubmit} className="grid grid-cols-7 gap-4 ">
            <input
               type="text"
               className="col-span-6 p-3 rounded-lg text-xl font-medium bg-lime-100 dark:bg-zinc-600"
               onChange={(e) => setKeyWord(e.target.value)}
            />
            <button
               className="bg-light-primary dark:text-black background_dropback col-span-1 font-bold text-lg"
               type="submit"
            >
               Search
            </button>
         </form>
         <div className="grid grid-cols-3 gap-4 mt-4">
            {posts.map((p) => (
               <div key={p._id}>
                  <Link href={`/post/${p._id}`}>
                     <div className="h-80 bg-white dark:bg-dark-primary background_dropback p-4">
                        {p.image ? (
                           <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md overflow-hidden flex items-center">
                              <img
                                 src={p.image}
                                 alt="img"
                                 className="w-full h-full"
                              />
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

export default Search;
