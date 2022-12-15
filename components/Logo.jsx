import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = (props) => {
   const { theme, setTheme } = useTheme();
   const [lightMode, setLightMode] = useState(false);
   useEffect(() => {
      if (theme == "light") {
         setLightMode(true);
      } else {
         setLightMode(false);
      }
   }, [theme]);

   if (lightMode) {
      return (
         <>
            <svg
               id="Layer_1"
               width={props.width}
               data-name="Layer 1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 2048 2048"
            >
               <path d="M462,483.69V1564.31l-216.46,125C92.45,1510.34,0,1278,0,1024S92.45,537.66,245.58,358.7Z" />
               <path d="M2048,1006.84c0,253.94-92.43,486.3-245.52,665.25l-172.61-99.65V491.81l200.73-115.9C1966.81,549.8,2048,768.83,2048,1006.84Z" />
               <path d="M1441.46,88.7V1959.3a1027.32,1027.32,0,0,1-791,18.42V70.28a1027.32,1027.32,0,0,1,791,18.42Z" />
               <path
                  d="M245.58,358.7,462,483.69V1564.31l-216.46,125C92.45,1510.34,0,1278,0,1024S92.45,537.66,245.58,358.7Z"
                  fill="none"
               />
               <path
                  d="M1441.46,88.7V1959.3a1027.32,1027.32,0,0,1-791,18.42V70.28a1027.32,1027.32,0,0,1,791,18.42Z"
                  fill="none"
               />
               <path
                  d="M2048,1006.84c0,253.94-92.43,486.3-245.52,665.25l-172.61-99.65V491.81l200.73-115.9C1966.81,549.8,2048,768.83,2048,1006.84Z"
                  fill="none"
               />
            </svg>
         </>
      );
   } else {
      return (
         <>
            <svg
               id="Layer_1"
               width={props.width}
               data-name="Layer 1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 2048 2048"
            >
               <path
                  d="M462,483.69V1564.31l-216.46,125C92.45,1510.34,0,1278,0,1024S92.45,537.66,245.58,358.7Z"
                  fill="#DBFC3C"
               />
               <path
                  d="M2048,1006.84c0,253.94-92.43,486.3-245.52,665.25l-172.61-99.65V491.81l200.72-115.9C1966.81,549.8,2048,768.83,2048,1006.84Z"
                  fill="#DBFC3C"
               />
               <path
                  d="M1441.46,88.7V1959.3a1027.32,1027.32,0,0,1-791,18.42V70.28a1027.32,1027.32,0,0,1,791,18.42Z"
                  fill="#DBFC3C"
               />
               <path
                  d="M245.58,358.7,462,483.69V1564.31l-216.46,125C92.45,1510.34,0,1278,0,1024S92.45,537.66,245.58,358.7Z"
                  fill="none"
               />
               <path
                  d="M1441.46,88.7V1959.3a1027.32,1027.32,0,0,1-791,18.42V70.28a1027.32,1027.32,0,0,1,791,18.42Z"
                  fill="none"
               />
               <path
                  d="M2048,1006.84c0,253.94-92.43,486.3-245.52,665.25l-172.61-99.65V491.81l200.72-115.9C1966.81,549.8,2048,768.83,2048,1006.84Z"
                  fill="none"
               />
            </svg>
         </>
      );
   }
};

export default Logo;