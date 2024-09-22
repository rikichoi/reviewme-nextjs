import Image from "next/image";
import React from "react";
import logoImage from "../assets/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-[4.5rem] bg-[#1c1c1c]">
      <div className="max-w-4xl m-auto flex px-2 items-center h-full justify-between">
        <Link href={"/"} className="flex items-center">
          <Image
            className="max-w-16"
            height={200}
            width={200}
            alt="ReviewMe Logo"
            src={logoImage}
          />
          <span className="text-white font-medium tracking-tighter text-2xl">
            ReviewMe
          </span>
        </Link>
        <Link href={"/reviews/post-review"} className="h-fit w-fit py-3 px-5 rounded-full text-sm font-bold tracking-tighter bg-[#a6c0f0] hover:bg-blue-700 hover:text-white">
          Post a review
        </Link>
      </div>
    </nav>
  );
}
