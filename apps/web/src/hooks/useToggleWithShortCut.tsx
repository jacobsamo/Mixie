import { useEffect, useState } from "react";

export const useToggleWithShortcut = (
  setExternalOpen?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setExternalOpen !== undefined
          ? setExternalOpen((open) => !open)
          : setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setExternalOpen]);

  return { open, setOpen };
};
