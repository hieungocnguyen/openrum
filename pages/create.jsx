import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import Editor from "../components/Editor";
import { Store } from "../utils/Store";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const Create = () => {
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const router = useRouter();
   const [selectedImage, setSelectedImage] = useState();
   const [content, setContent] = useState("");
   let urlImage = "";
   const [loading, setLoading] = useState(false);
   const {
      handleSubmit,
      control,
      register,
      formState: { errors },
   } = useForm();
   const imageChange = (e) => {
      setSelectedImage(e.target.files[0]);
   };
   const submitHandler = async ({ subject, category }) => {
      try {
         setLoading(true);
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
         router.push("/");
         console.log(data);
         setLoading(false);
         toast.success("Done!", {
            position: "bottom-center",
         });
      } catch (err) {
         setLoading(false);
         toast.error("Done!", {
            position: "top-center",
         });
      }
   };

   return (
      <Layout>
         <div className="font-extrabold text-3xl my-4">Write your post</div>
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
            <div className="App w-full text-black">
               <Editor
                  onChange={(data) => {
                     setContent(data);
                  }}
               />
            </div>
            {/* <div className="text-black w-full">
               {editorLoaded ? (
                  <CKEditor
                     type=""
                     name="description"
                     editor={Editor}
                     data="<p></p>"
                     onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                     }}
                  />
               ) : (
                  <div>Editor loading</div>
               )}
            </div> */}
            {/* <textarea
               rows="14"
               className="w-full p-4 bg-lime-100 dark:bg-zinc-700"
               placeholder="Write content here..."
               {...register("content")}
            ></textarea> */}
            <div className="text-left">
               <div className="flex gap-6 my-4">
                  <div className=" font-semibold">Select Category</div>
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
                     <option value="Finance & Banking">
                        Finance & Banking
                     </option>
                     <option value="Foreign Languages">
                        Foreign Languages
                     </option>
                  </select>
               </div>
               <div className="flex gap-6 my-4">
                  <div className=" font-semibold">Select Thumbnail</div>
                  <input type="file" onChange={imageChange} required />
               </div>
            </div>
            <button
               type="submit"
               className="p-4 bg-light-primary dark:bg-dark-primary w-fit"
            >
               Upload
            </button>
         </form>
         {loading ? <Loader /> : <></>}
         <Toaster />
      </Layout>
   );
};

// export default Create;
export default dynamic(() => Promise.resolve(Create), { ssr: false });
