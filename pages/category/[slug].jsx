/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CategoriesNavigation from "../../components/Categories";
import Layout from "../../components/Layout";
import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";
import PostGrid from "../../components/PostGrid";
const utf8 = require("utf8");

const PostofCategory = (props) => {
   const { posts } = props;

   return (
      <Layout>
         <CategoriesNavigation />
         <PostGrid posts={posts} />
      </Layout>
   );
};

export default PostofCategory;

export async function getServerSideProps(context) {
   const { params } = context;
   const { slug } = params;

   await dbConnect.connect();
   const data = await Post.find({ category: slug }).lean();
   await dbConnect.disconnect();
   return {
      props: {
         posts: JSON.parse(JSON.stringify(data)),
      },
   };
}
