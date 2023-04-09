import React, { ReactElement } from "react";

interface InnerLabelProps {
  inputId: string;
  label: string;
  className?: string;
}

const InnerLabel = ({
  inputId,
  label,
  className,
  ...props
}: InnerLabelProps): ReactElement => {
  return (
    <label className={className} htmlFor={inputId}>
      {label}
    </label>
  );
};

export default InnerLabel;
