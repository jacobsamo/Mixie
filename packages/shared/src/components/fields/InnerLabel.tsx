import React, { ReactElement } from "react";

interface InnerLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  label: string;
  className?: string;
}

const InnerLabel = ({
  id,
  label,
  className,
  ...props
}: InnerLabelProps): ReactElement => {
  return (
    <label className={className} htmlFor={id} {...props}>
      {label}
    </label>
  );
};

export default InnerLabel;
