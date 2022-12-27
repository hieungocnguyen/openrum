/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import image from "../public/noData.png";

const PostGrid = ({ posts }) => {
   return (
      <div>
         {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-4">
               {posts.map((p) => (
                  <div key={p._id}>
                     <Link href={`/post/${p._id}`}>
                        <div className="h-80 bg-white dark:bg-dark-primary background_dropback p-4">
                           {p.image ? (
                              <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md overflow-hidden flex items-center ">
                                 <img
                                    src={p.image}
                                    alt="img"
                                    className="h-full w-full"
                                 />
                              </div>
                           ) : (
                              <div className="bg-pink-300 h-2/3 w-full mx-auto rounded-md"></div>
                           )}
                           <div className=" mt-2 font-extrabold text-xl line-clamp-2">
                              {p.subject}
                           </div>
                           <div className="absolute bottom-2 ">
                              {p.authorName} |{" "}
                              <span className="dark:text-light-primary text-black ">
                                 {p.category}
                              </span>
                           </div>
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex flex-col justify-center items-center">
               <Image
                  src={image}
                  alt="nothing here"
                  className="w-52 mt-14 mb-2"
               />
            </div>
         )}
      </div>
   );
};

export default PostGrid;
