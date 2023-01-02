import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";

function Editor({ onChange, name, value }) {
   const editorRef = useRef();
   const { CKEditor, ClassicEditor } = editorRef.current || {};
   const [editorLoaded, setEditorLoaded] = useState(false);
   const router = useRouter();

   useEffect(() => {
      try {
         editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
         };
         setEditorLoaded(true);
      } catch (err) {
         router.push("/create");
      }
      setEditorLoaded(true);
   }, [editorLoaded, router]);

   return (
      <div>
         <div className="black:text-white my-2 font-semibold">Content</div>
         {editorLoaded ? (
            <div>
               <CKEditor
                  editor={ClassicEditor}
                  data={value}
                  onChange={(event, editor) => {
                     //event property make getData() work
                     const data = editor.getData();
                     onChange(data);
                  }}
               />
            </div>
         ) : (
            <div>Editor loading</div>
         )}
      </div>
   );
}

// export default Editor;
export default dynamic(() => Promise.resolve(Editor), { ssr: false });
