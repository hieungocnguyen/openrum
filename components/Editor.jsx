import React, { useEffect, useState, useRef } from "react";

function Editor({ onChange, name, value }) {
   const editorRef = useRef();
   const { CKEditor, ClassicEditor } = editorRef.current || {};
   const [editorLoaded, setEditorLoaded] = useState(false);

   useEffect(() => {
      try {
         editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
         };
         setEditorLoaded(true);
      } catch (err) {}
   }, []);

   return (
      <div>
         {editorLoaded ? (
            <CKEditor
               editor={ClassicEditor}
               data={value}
               onChange={(event, editor) => {
                  //event property make getData() work
                  const data = editor.getData();
                  onChange(data);
               }}
            />
         ) : (
            <div>Editor loading</div>
         )}
      </div>
   );
}

export default Editor;
