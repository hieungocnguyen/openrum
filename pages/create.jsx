import Layout from "../components/Layout";

const Create = () => {
   return (
      <Layout>
         <div className="font-extrabold text-3xl">Write your post</div>
         <textarea
            rows="1"
            className="p-4 w-full text-xl bg-lime-100 dark:bg-zinc-700"
            placeholder="Subject..."
         ></textarea>
         <textarea
            className="w-full p-4 bg-lime-100 dark:bg-zinc-700"
            placeholder="Write content here..."
         ></textarea>
         <input type="file" />
         <button>Upload</button>
      </Layout>
   );
};

export default Create;
