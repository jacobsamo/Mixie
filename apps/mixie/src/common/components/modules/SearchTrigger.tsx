"use client";
import React from "react";
import Search from "./Search";
import { Button } from "@components/ui/button";

interface SearchTriggerProps {
  children: React.ReactNode;
}

const SearchTrigger = ({ children }: SearchTriggerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        ariaLabel="Search by keyword, ingredient or recipes"
        unstyled
        onClick={() => setOpen(!open)}
      >
        {children}
      </Button>
      <Search externalOpen={open} setExternalOpen={setOpen} />
    </>
  );
};

export default SearchTrigger;
