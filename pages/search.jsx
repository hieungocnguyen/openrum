import Layout from "../components/Layout";

const Search = () => {
   return (
      <Layout>
         <div className="grid grid-cols-7 gap-4 ">
            <input
               type="text"
               className="col-span-6 p-3 rounded-lg text-xl font-medium bg-lime-100 dark:bg-zinc-600"
            />
            <button className="bg-light-primary dark:bg-dark-primary background_dropback col-span-1 text-lg font-semibold">
               Search
            </button>
         </div>
         <div className="mt-4">Contents here</div>
      </Layout>
   );
};

export default Search;
