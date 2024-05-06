"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/server/supabase/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const supabase = createClient();
  const router = useRouter();

  const signOut = () => {
    supabase.auth.signOut();
    router.push("/");
  };

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
      <Button aria-label="singout of mixie" onClick={() => signOut({callbackUrl: "/", redirect: true})}>
        Sign out
      </Button>
    </>
  );
};

export default LoginPage;
