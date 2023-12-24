"use client";
import React from "react";
import SearchDialog from "./SearchDialog";
import { Button } from "@components/ui/button";

interface SearchTriggerProps {
  children: React.ReactNode;
}

const SearchTrigger = ({ children }: SearchTriggerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        aria-label="Search by keyword, ingredient or recipes"
        unstyled
        onClick={() => setOpen(!open)}
      >
        {children}
      </Button>
      <SearchDialog externalOpen={open} setExternalOpen={setOpen} />
    </>
  );
};

export default SearchTrigger;
