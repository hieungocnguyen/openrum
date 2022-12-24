import Logo from "./Logo";
import {
   HiOutlineSearch,
   HiOutlinePencilAlt,
   HiOutlineBookmark,
   HiOutlineMoon,
   HiOutlineInformationCircle,
   HiOutlineLogin,
   HiUserCircle,
   HiLogout,
   HiUser,
} from "react-icons/hi";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Layout = ({ children }) => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const router = useRouter();

   useEffect(() => setMounted(true), []);
   if (!mounted) return null;

   const logoutClickHandler = () => {
      dispatch({ type: "USER_LOGOUT" });
      Cookies.remove("userInfo");
      router.push("/");
   };

   return (
      <div className="grid grid-cols-12">
         <div className="col-span-1 h-screen sticky top-0 bottom-0 p-4 ">
            <div className="h-full bg-light-primary dark:bg-dark-primary background_dropback flex flex-col items-center justify-between py-4">
               <Link href={`/`}>
                  <div className="cursor-pointer">
                     <Logo width="50" />
                  </div>
               </Link>
               <div className="text-3xl flex flex-col gap-4 mb-16 dark:text-light-primary">
                  <Link href={`/search`}>
                     <div className="p-2 rounded-lg cursor-pointer hover:bg-secondary-pink dark:hover:bg-gray-600">
                        <HiOutlineSearch />
                     </div>
                  </Link>
                  {userInfo ? (
                     <Link href={`/create`}>
                        <div className="p-2 rounded-lg cursor-pointer hover:bg-secondary-pink dark:hover:bg-gray-600">
                           <HiOutlinePencilAlt />
                        </div>
                     </Link>
                  ) : (
                     <Link href={`/login`}>
                        <div className="p-2 rounded-lg cursor-pointer hover:bg-secondary-pink dark:hover:bg-gray-600">
                           <HiOutlinePencilAlt />
                        </div>
                     </Link>
                  )}
                  <Link href={`/bookmark`}>
                     <div className="p-2 rounded-lg cursor-pointer hover:bg-secondary-pink dark:hover:bg-gray-600">
                        <HiOutlineBookmark />
                     </div>
                  </Link>
               </div>
               <div className="text-3xl flex flex-col gap-2 dark:text-light-primary">
                  <div
                     className="p-2 rounded-lg cursor-pointer hover:bg-secondary-pink dark:hover:bg-gray-600"
                     onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                     }
                  >
                     <HiOutlineMoon />
                  </div>
                  <Link href={`/about`}>
                     <div className="p-2 hover:bg-secondary-pink rounded-lg cursor-pointer  dark:hover:bg-gray-600">
                        <HiOutlineInformationCircle />
                     </div>
                  </Link>
                  {userInfo ? (
                     <div
                        className=" p-2 hover:bg-secondary-pink rounded-lg cursor-pointer  dark:hover:bg-gray-600 mt-4"
                        onClick={logoutClickHandler}
                     >
                        <HiUser />
                     </div>
                  ) : (
                     <Link href={`/login`}>
                        <div className=" p-2 hover:bg-secondary-pink rounded-lg cursor-pointer  dark:hover:bg-gray-600 mt-4">
                           <HiOutlineLogin />
                        </div>
                     </Link>
                  )}
               </div>
            </div>
         </div>
         <main className="col-span-11 py-4 pr-4">{children}</main>
      </div>
   );
};

export default Layout;
