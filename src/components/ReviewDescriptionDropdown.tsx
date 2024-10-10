"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

type ReviewDescriptionDropdownProps = {
  description: string;
  category: string;
};

export default function ReviewDescriptionDropdown({
  description,
  category,
}: ReviewDescriptionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
    } else {
      return;
    }
  }, [isOpen]);
  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex text-sm tracking-tight items-center">
        <p>{category}</p>
        <button
          type="button"
          className="flex items-center ml-auto gap-1 text-blue-500 hover:text-blue-700"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Read more
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      <div
        className={`${isOpen ? " block " : " hidden "}`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
}
