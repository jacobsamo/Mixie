import React from "react";
import Image from "next/image";
import { Input } from "@/src/common/components/ui/input";
import { Button } from "@/src/common/components/ui/button";
import { GithubIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="m-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-3 text-center dark:bg-grey">
      <div className="flex flex-col items-center">
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={128}
          height={128}
          className="h-32 w-32 rounded-full"
        />
        <h1 className="text-step--1">Welcome to Meally</h1>
      </div>
      <div className="flex w-2/3 flex-col  gap-4">
        <Input label="Email" name="email" type="email" placeholder="Email" />
        <Button ariaLabel="Log into Meally" className="mx-auto w-full">
          Log in
        </Button>
      </div>
      <span className="my-2 mb-4 h-[0.125rem] w-3/4 rounded-md bg-grey dark:bg-white"></span>
      <div>
        <Button
          LeadingIcon={<GithubIcon />}
          ariaLabel="sign in with google"
          className="bg-[#333333] p-3 text-step--2 text-white"
        >
          Sign in with Github
        </Button>
        {/* <Button ariaLabel='sign in with google'>Sign in with Google</Button>
                <Button ariaLabel='sign in with github'>Sign in with Facebook</Button> */}
      </div>
    </div>
  );
};

export default LoginPage;
