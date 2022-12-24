import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { HiOutlineHome } from "react-icons/hi";

const Login = () => {
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;

   const {
      handleSubmit,
      control,
      register,
      formState: { errors },
   } = useForm();
   const router = useRouter();

   const submitHandler = async ({ email, password }) => {
      try {
         const { data } = await axios.post("/api/user/login", {
            email,
            password,
         });
         Cookies.set("userInfo", JSON.stringify(data));
         dispatch({ type: "USER_LOGIN", payload: data });
         router.push("/");
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div>
         <div className="flex justify-center my-4">
            <Link href={`/`}>
               <div className="text-black p-2 bg-light-primary rounded-lg text-xl">
                  <HiOutlineHome />
               </div>
            </Link>
         </div>
         <div className="flex flex-col items-center my-4">
            <div className="my-4 font-semibold text-2xl">Login</div>
            <form
               className="lg:w-1/3 sm:w-2/3 mx-auto"
               onSubmit={handleSubmit(submitHandler)}
            >
               <div className="grid grid-cols-4 mb-4 items-center">
                  <label htmlFor="username" className="col-span-1 font-bold ">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     {...register("email")}
                     required
                     className="col-span-3 p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg"
                  />
               </div>
               <div className="grid grid-cols-4 mb-4 items-center">
                  <label htmlFor="password" className="col-span-1 font-bold ">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     required
                     {...register("password")}
                     className="col-span-3 p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg"
                  />
               </div>
               <div className="flex justify-center">
                  <button
                     type="submit"
                     className="bg-light-primary text-black py-2 px-4 background_dropback my-8 text-center font-semibold"
                  >
                     Log in
                  </button>
               </div>
            </form>
            <Link href={`/register`}>
               <div className="text-light-primary font-semibold">
                  Register new account
               </div>
            </Link>
         </div>
      </div>
   );
};

export default Login;
