import Link from "next/link";
import nc from "next-connect";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
   const router = useRouter();
   const {
      handleSubmit,
      control,
      register,
      formState: { errors },
   } = useForm();
   const submitHandler = async ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
         console.log("mk ko khop");
         return;
      }
      try {
         const { data } = await axios.post(
            "http://localhost:3000/api/user/register",
            {
               name,
               email,
               password,
            }
         );
         router.push("/login");
      } catch (err) {
         console.log("loi");
      }
   };

   return (
      <div>
         <div className="text-center">
            <Link href={`login`}>
               <div>Back to log in page</div>
            </Link>
            <Link href={`/`}>
               <div>Back to home page</div>
            </Link>
         </div>
         <div className="flex flex-col items-center my-4">
            <div>Register</div>
            <form
               className="lg:w-1/3 sm:w-2/3 mx-auto"
               onSubmit={handleSubmit(submitHandler)}
            >
               <div className="grid grid-cols-5 mb-4 items-center">
                  <label htmlFor="email" className="col-span-2">
                     Email
                  </label>
                  <input
                     type="text"
                     id="email"
                     name="email"
                     {...register("email")}
                     className="col-span-3 p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg"
                  />
               </div>
               <div className="grid grid-cols-5 mb-4 items-center">
                  <label htmlFor="name" className="col-span-2">
                     Name
                  </label>
                  <input
                     type="text"
                     name="name"
                     {...register("name")}
                     className="col-span-3 p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg"
                  />
               </div>
               <div className="grid grid-cols-5 mb-4 items-center">
                  <label htmlFor="password" className="col-span-2">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     {...register("password")}
                     className="col-span-3 p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg"
                  />
               </div>
               <div className="grid grid-cols-5 mb-4 items-center">
                  <label htmlFor="confirmpassword" className="col-span-2">
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     name="confirmpassword"
                     {...register("confirmPassword")}
                     className="col-span-3 p-2 bg-slate-100 dark:bg-neutral-700 rounded-lg"
                  />
               </div>
               <div className="flex justify-center">
                  <button
                     className="bg-light-primary dark:bg-dark-primary py-2 px-4 background_dropback my-4 text-center font-semibold"
                     type="submit"
                  >
                     Register
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Register;
