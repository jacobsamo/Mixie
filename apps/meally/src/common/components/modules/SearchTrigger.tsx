"use client";
import React from "react";
import Search from "./Search";

interface SearchTriggerProps {
  children: React.ReactNode;
}

const SearchTrigger = ({ children }: SearchTriggerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        aria-label="Open dialog to search for recipes"
        onClick={() => setOpen(!open)}
      >
        {children}
      </button>
      <Search externalOpen={open} setExternalOpen={setOpen} />
    </>
  );
};

export default SearchTrigger;
