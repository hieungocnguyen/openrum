import Link from "next/link";
import CategoriesNavigation from "../../components/Categories";
import Layout from "../../components/Layout";
import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";
const utf8 = require("utf8");

const PostofCategory = (props) => {
   const { posts } = props;

   return (
      <Layout>
         <CategoriesNavigation />
         <div className="grid grid-cols-3 gap-4 mt-4">
            {posts.map((p) => (
               <div key={p._id}>
                  <Link href={`/post/${p._id}`}>
                     <div className="h-80 bg-white dark:bg-dark-primary background_dropback p-4">
                        <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
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

export default PostofCategory;

export async function getServerSideProps(context) {
   const { params } = context;
   const { slug } = params;

   await dbConnect.connect();
   const data = await Post.find({ category: slug }).lean();
   await dbConnect.disconnect();
   return {
      props: {
         posts: data.map(dbConnect.convertDocToObj),
      },
   };
}
