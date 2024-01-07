"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src="/icons/icon.jpg"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Signout of Mixie</h1>
      </div>
      <Button aria-label="singout of mixie" onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  );
};

export default LoginPage;
