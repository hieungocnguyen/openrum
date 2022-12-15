import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
   return (
      <Layout>
         {/* category */}
         <div className="grid grid-cols-3 gap-4 ">
            <div className="bg-light-primary background_dropback py-2 text-center font-bold text-lg cursor-pointer light:hover:bg-[#FFBCE5] dark:bg-dark-primary">
               Infomation Technology
            </div>
            <div className="bg-light-primary background_dropback py-2 text-center font-bold text-lg cursor-pointer light:hover:bg-[#FFBCE5] dark:bg-dark-primary">
               Finance & Banking
            </div>
            <div className="bg-light-primary background_dropback py-2 text-center font-bold text-lg cursor-pointer light:hover:bg-[#FFBCE5] dark:bg-dark-primary">
               Foreign Languages
            </div>
         </div>
         {/* posts */}
         <div className="grid grid-cols-3 gap-4 mt-4">
            <Link href={`/post/1`}>
               <div className="h-80 bg-white dark:bg-dark-primary background_dropback p-4">
                  <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
                  <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                     12 React Hooks Every React Developer Should Know
                  </div>
                  <div className=" mt-2 font-normal text-lg">Hieu Nguyen</div>
               </div>
            </Link>
            <div className="h-80 bg-white dark:bg-dark-primary  background_dropback p-4">
               <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
               <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                  12 React Hooks Every React Developer Should Know
               </div>
               <div className=" mt-2 font-normal text-lg">Hieu Nguyen</div>
            </div>
            <div className="h-80 bg-white dark:bg-dark-primary  background_dropback p-4">
               <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
               <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                  12 React Hooks Every React Developer Should Know
               </div>
               <div className=" mt-2 font-normal text-lg">Hieu Nguyen</div>
            </div>
            <div className="h-80 bg-white dark:bg-dark-primary  background_dropback p-4">
               <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
               <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                  12 React Hooks Every React Developer Should Know
               </div>
               <div className=" mt-2 font-normal text-lg">Hieu Nguyen</div>
            </div>
         </div>
      </Layout>
   );
}
