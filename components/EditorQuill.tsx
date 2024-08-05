import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorQuillProps {
  value: string;
  onChange: (content: string) => void;
}

const modules = {
  toolbar: [
    ["bold", "italic"],
    [{ color: [] }],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
  ],
};

const formats = [
  "bold",
  "italic",
  "color",
  "align",
  "list",
  "ordered",
  "bullet",
];

export default function EditorQuill({ value, onChange }: EditorQuillProps) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
}
