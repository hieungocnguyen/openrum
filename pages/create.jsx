import Layout from "../components/Layout";
import { useRef, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
   {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
   },
];

const Create = () => {
   const [editor] = useState(() => withReact(createEditor()));

   return (
      <Layout>
         <div className="font-extrabold text-3xl">Write your post</div>
         <textarea className="w-full" placeholder="Write here ..."></textarea>
         <input type="file" />
         <button>Upload</button>
      </Layout>
   );
};

export default Create;
