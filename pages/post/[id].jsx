import Layout from "../../components/Layout";

const DetailPost = () => {
   return (
      <Layout>
         <div className="min-h-full bg-white background_dropback p-5">
            <div className="text-4xl font-extrabold">
               12 React Hooks Every React Developer Should Know
            </div>
            <div className="flex gap-2 items-center my-3">
               <div className="h-10 w-10 object-cover overflow-hidden rounded-full">
                  <img
                     src="https://images.unsplash.com/photo-1670500557067-3e2b3dde6625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                     alt="123"
                  />
               </div>
               <div className="">Hieu Nguyen</div>
            </div>
            {/* content post */}
            <div></div>
         </div>
      </Layout>
   );
};

export default DetailPost;
