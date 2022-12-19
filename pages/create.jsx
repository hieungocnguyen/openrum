import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

const Create = () => {
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const router = useRouter();
   const {
      handleSubmit,
      control,
      register,
      formState: { errors },
   } = useForm();

   const submitHandler = async ({ subject, content }) => {
      try {
         const { data } = await axios.post("api/post", {
            subject,
            content,
         });
         router.push("/");
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <Layout>
         <div className="font-extrabold text-3xl">Write your post</div>
         <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit(submitHandler)}
         >
            <textarea
               rows="1"
               className="p-4 w-full text-xl bg-lime-100 dark:bg-zinc-700"
               placeholder="Subject..."
               {...register("subject")}
            ></textarea>
            <textarea
               className="w-full p-4 bg-lime-100 dark:bg-zinc-700"
               placeholder="Write content here..."
               {...register("content")}
            ></textarea>
            {/* <input type="file" /> */}
            <button
               type="submit"
               className="p-4 bg-light-primary dark:bg-dark-primary w-fit"
            >
               Upload
            </button>
         </form>
      </Layout>
   );
};

export default Create;
