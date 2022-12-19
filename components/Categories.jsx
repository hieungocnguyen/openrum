import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesNavigation = () => {
   return (
      <div className="grid grid-cols-3 gap-4 ">
         <Link
            href={`/category/${encodeURIComponent("Infomation Technology")}`}
         >
            <div className="bg-light-primary background_dropback py-2 text-center font-bold text-lg cursor-pointer light:hover:bg-[#FFBCE5] dark:bg-dark-primary">
               Infomation Technology
            </div>
         </Link>
         <Link href={`/category/${encodeURIComponent("Finance & Banking")}`}>
            <div className="bg-light-primary background_dropback py-2 text-center font-bold text-lg cursor-pointer light:hover:bg-[#FFBCE5] dark:bg-dark-primary">
               Finance & Banking
            </div>
         </Link>
         <Link href={`/category/${encodeURIComponent("Foreign Languages")}`}>
            <div className="bg-light-primary background_dropback py-2 text-center font-bold text-lg cursor-pointer light:hover:bg-[#FFBCE5] dark:bg-dark-primary">
               Foreign Languages
            </div>
         </Link>
      </div>
   );
};

export default CategoriesNavigation;
