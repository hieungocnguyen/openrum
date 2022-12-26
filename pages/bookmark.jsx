/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostGrid from "../components/PostGrid";
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
         <div className="font-extrabold text-3xl my-4">Your Bookmark</div>
         <PostGrid posts={posts} />
      </Layout>
   );
};

export default Bookmark;
