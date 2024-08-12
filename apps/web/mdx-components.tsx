import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

const getId = (title: ReactNode | string): string =>
  title!
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        id={getId(children)}
        className="scroll-m-20 text-step1 font-bold"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        id={getId(children)}
        className="mt-10 scroll-m-20 text-step--2 font-bold"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={getId(children)}
        className="mt-8 scroll-m-20 text-step--3 font-bold"
        {...props}
      >
        {children}
      </h3>
    ),
    p: (props) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    ),
    ul: (props) => <ul className="mt-4 list-disc pl-8" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal pl-8" {...props} />,
    a: ({ children, ...props }) => (
      <Link
        className="underline decoration-yellow decoration-2 underline-offset-[4.5px]"
        {...(props as LinkProps)}
      >
        {children}
      </Link>
    ),
    img: (props) => (
      <Image
        sizes="(max-width: 768px) 100vw, 50vw"
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
