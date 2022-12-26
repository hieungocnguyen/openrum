import Layout from "../components/Layout";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import PostGrid from "../components/PostGrid";

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
   useEffect(() => {
      fetchPosts();
   }, []);

   return (
      <Layout>
         <div className="font-extrabold text-3xl my-4">Your Post</div>
         <PostGrid posts={posts} />
      </Layout>
   );
};

export default YourPost;
