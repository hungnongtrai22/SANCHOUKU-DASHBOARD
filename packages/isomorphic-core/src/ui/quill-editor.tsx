"use client";

import { useRef } from "react";
import ReactQuill from "react-quill-new";
import { FieldError } from "rizzui";
import cn from "../utils/class-names";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps extends ReactQuill.ReactQuillProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  toolbarPosition?: "top" | "bottom";
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = "top",
  ...props
}: QuillEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  // ✅ HANDLE UPLOAD ẢNH
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", "quill");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BE_HOST}/api/cloudinary`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = (await res.json()) as { url: string }[];
        const imageUrl = data[0]?.url;

        if (!imageUrl) throw new Error("Upload failed");

        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection(true);

        if (quill && range) {
          quill.insertEmbed(range.index, "image", imageUrl);
        }
      } catch (err) {
        console.error(err);
        alert("Upload ảnh thất bại");
      }
    };
  };

  // ✅ MODULES (gắn handler)
  const quillModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["link", "image"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload, // 👈 quan trọng
      },
    },
  };

  return (
    <div className={cn(className)}>
      {label && (
        <label className={cn("mb-1.5 block", labelClassName)}>{label}</label>
      )}

      <ReactQuill
        ref={quillRef} // 👈 cần có
        theme="snow"
        modules={quillModules}
        className={cn(
          "react-quill",
          toolbarPosition === "bottom" && "react-quill-toolbar-bottom relative",
          className,
        )}
        {...props}
      />

      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  );
}
