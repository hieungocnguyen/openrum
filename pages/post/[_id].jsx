import Layout from "../../components/Layout";
import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";

const DetailPost = (props) => {
   const { post } = props;
   return (
      <Layout>
         <div className="min-h-full bg-white dark:bg-dark-primary background_dropback p-5">
            <div className="text-4xl font-extrabold">{post.subject}</div>
            <div className="">{post.author}</div>
            {/* content post */}
            <div>{post.content}</div>
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
