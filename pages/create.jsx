import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

const Create = () => {
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const router = useRouter();
   const [selectedImage, setSelectedImage] = useState();
   let urlImage = "";
   const {
      handleSubmit,
      control,
      register,
      formState: { errors },
   } = useForm();
   const imageChange = (e) => {
      setSelectedImage(e.target.files[0]);
   };
   const submitHandler = async ({ subject, content, category }) => {
      try {
         if (selectedImage) {
            const resUploadCloudinary = await axios.post(
               "api/upload",
               { file: selectedImage },
               {
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
               }
            );
            urlImage = resUploadCloudinary.data.url;
         }

         const { data } = await axios.post(
            "api/post",
            {
               subject: subject,
               content: content,
               category: category,
               image: urlImage,
            },
            {
               headers: { authorization: `Bearer ${userInfo.token}` },
            }
         );
         // router.push("/");
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
            <select
               name="category"
               id="category"
               {...register("category")}
               required
            >
               <option value="">Category</option>
               <option value="Information Technology">
                  Infomation Technology
               </option>
               <option value="Finance & Banking">Finance & Banking</option>
               <option value="Foreign Languages">Foreign Languages</option>
            </select>
            <input type="file" onChange={imageChange} />
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
