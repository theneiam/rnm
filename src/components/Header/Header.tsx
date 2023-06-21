import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-row h-20 items-center px-5 bg-gray-800 fixed w-full">
      <Link href="/" className="mr-5">
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
      </Link>
      <div className="flex flex-row text-[#62a4ab] gap-4">
        <Link href="/characters">Charactes</Link>
        <Link href="/guess-who">Guess who?</Link>
      </div>
    </div>
  );
};
