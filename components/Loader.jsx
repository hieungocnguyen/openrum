import React, { CSSProperties, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
   let [color, setColor] = useState("#DBFC3C");
   return (
      <>
         <div className="fixed top-0 right-0 w-screen h-screen flex items-center justify-center bg-opacity-20 bg-black z-10">
            <PuffLoader
               color={color}
               loading={true}
               size={100}
               speedMultiplier={1}
               className=""
            />
         </div>
      </>
   );
};

export default Loader;
