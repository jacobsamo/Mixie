import React from "react";
import { FieldError } from "react-hook-form";

const Error = ({ error }: { error?: string | FieldError | null }) => {
  if (error)
    return (
      <span className="text-destructive text-step--3 font-extralight italic">
        {typeof error === "string" ? error : error.message}
      </span>
    );

  return null;
};

export default Error;
