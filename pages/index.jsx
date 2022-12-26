/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoriesNavigation from "../components/Categories";
import Layout from "../components/Layout";
import PostGrid from "../components/PostGrid";
import Post from "../models/Post";
import dbConnect from "../utils/dbConnect";

export default function Home(props) {
   const { posts } = props;
   return (
      <Layout>
         <CategoriesNavigation />
         <PostGrid posts={posts} />
      </Layout>
   );
}

export async function getServerSideProps() {
   await dbConnect.connect();
   const data = await Post.find({}).lean();
   await dbConnect.disconnect();
   return {
      props: {
         posts: JSON.parse(JSON.stringify(data)),
      },
   };
}
