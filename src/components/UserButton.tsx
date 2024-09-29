import React from "react";

type UserButtonProps = {
  username: string;
};

export default function UserButton({ username }: UserButtonProps) {
  return (
    <button className="h-fit w-fit py-3 px-5 rounded-full text-sm font-bold tracking-tighter bg-[#a6c0f0] hover:bg-blue-700 hover:text-white">
      {username}
    </button>
  );
}
