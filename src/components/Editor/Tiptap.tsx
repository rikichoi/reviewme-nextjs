"use client";
import { CreateReviewSchema } from "@/lib/validation";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import "./tiptapStyles.css";
import { Toolbar } from "./Toolbar";

// TODO: FIX THE HYDRATION WARNING ERROR 

type TiptapProps = {
  register: UseFormRegister<CreateReviewSchema>;
  setValue: UseFormSetValue<CreateReviewSchema>;
  errors?: string;
  description: string;
};

const Tiptap = ({ register, setValue, description, errors }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Placeholder.configure({ placeholder: "Write your review here..." }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: `${
          errors && " border-red-500 "
        } rounded-md h-full p-2 w-full min-h-[200px] ring-none outline-none border-2 focus:border-zinc-950 bg-white`,
      },
    },
    onUpdate({ editor }) {
      setValue("description", editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] gap-3">
      <Toolbar editor={editor} />
      <EditorContent
        {...register("description")}
        id="description"
        name="description"
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
