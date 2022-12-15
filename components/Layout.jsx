import Logo from "./Logo";
import {
   HiOutlineSearch,
   HiOutlinePencilAlt,
   HiOutlineBookmark,
   HiOutlineMoon,
   HiOutlineInformationCircle,
   HiOutlineLogin,
} from "react-icons/hi";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   if (!mounted) return null;

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
                  <Link href={`/create`}>
                     <div className="p-2 rounded-lg cursor-pointer hover:bg-secondary-pink dark:hover:bg-gray-600">
                        <HiOutlinePencilAlt />
                     </div>
                  </Link>
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
                  <Link href={`/login`}>
                     <div className=" p-2 hover:bg-secondary-pink rounded-lg cursor-pointer  dark:hover:bg-gray-600 mt-4">
                        <HiOutlineLogin />
                     </div>
                  </Link>
               </div>
            </div>
         </div>
         <main className="col-span-11 py-4 pr-4">{children}</main>
      </div>
   );
};

export default Layout;
