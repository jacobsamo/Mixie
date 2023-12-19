import React from "react";

interface VersionChipProps {
  release: "alpha" | "beta" | "rc" | "stable";
  version?: number;
}

const VersionChip = ({ release, version }: VersionChipProps) => {
  return (
    <span className="inline-flex h-6 w-auto items-center justify-center rounded-xl bg-transparent bg-opacity-60 p-2 text-step--4 outline outline-[0.2px] outline-yellow">
      {release} {version}
    </span>
  );
};

export default VersionChip;
