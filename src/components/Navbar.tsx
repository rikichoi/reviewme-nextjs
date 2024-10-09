import Image from "next/image";
import React from "react";
import logoImage from "../assets/logo.png";
import Link from "next/link";
import { getUser } from "@/auth";
import { logout } from "@/app/(auth)/actions";

export default async function Navbar() {
  const session = await getUser();
  return (
    <nav
      className={`${
        session && session.role === "admin" && " !max-h-[11rem] pb-2 "
      } w-full z-50 max-h-[4.5rem] bg-[#1c1c1c]`}
    >
      <div
        className={`${
          session && session.role === "admin" && " flex-col "
        } max-w-4xl m-auto flex px-2 items-center h-full justify-between`}
      >
        <div className="m-auto flex max-w-4xl w-full items-center h-full justify-between">
          <Link href={"/"} className="flex items-center">
            <Image
              className="max-w-8 sm:max-w-16"
              height={200}
              width={200}
              alt="ReviewMe Logo"
              src={logoImage}
            />
            <span className="text-white font-medium tracking-tighter text-lg sm:text-2xl">
              ReviewMe
            </span>
          </Link>
          <div className="flex gap-2 items-center">
            <Link
              href={"/reviews/post-review"}
              className="flex h-fit w-fit py-1 px-1.5 text-xs sm:py-3 sm:px-5 rounded-full sm:text-sm font-bold tracking-tighter bg-[#a6c0f0] hover:bg-blue-700 hover:text-white"
            >
              Post a review
            </Link>
            {session ? (
              <form className="flex" action={logout}>
                <button className="h-fit w-fit py-1 px-1.5 sm:py-3 sm:px-5 text-xs rounded-full sm:text-sm font-bold tracking-tighter bg-[#f86868] hover:bg-red-700 hover:text-white">
                  Sign Out
                </button>
              </form>
            ) : (
              <Link
                href={"/login"}
                className="flex h-fit w-fit py-1 px-1.5 sm:py-3 sm:px-5 text-xs rounded-full sm:text-sm font-bold tracking-tighter bg-[#00b67a]  hover:bg-green-700 hover:text-white"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
        {session && session.role === "admin" && (
          <Link
            href={"/admin"}
            className="flex h-fit w-full justify-center py-1 px-1.5 text-xs sm:py-3 sm:px-5 rounded-full sm:text-sm font-bold tracking-tighter bg-red-500 hover:bg-red-700 hover:text-white"
          >
            Admin Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
