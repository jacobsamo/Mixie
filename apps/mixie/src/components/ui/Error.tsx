import React from "react";
import { FieldError } from "react-hook-form";

const Error = ({ error }: { error?: FieldError | null }) => {
  if (error)
    return (
      <span className="text-step--3 font-extralight italic text-red">
        {error.message}
      </span>
    );

  return null;
};

export default Error;
