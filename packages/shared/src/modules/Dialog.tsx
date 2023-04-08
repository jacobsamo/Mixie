import React, { useEffect, useRef, useCallback } from "react";

interface DialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  closeKeys?: string[];
  openKeys?: string[];
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

/**
 * A dialog component that can be opened and closed with a keyboard shortcut.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the dialog is currently open.
 * @param {function} props.setOpen - A function to update the open state of the dialog.
 * @param {JSX.Element} props.children - The content to display inside the dialog.
 * @param {string} [props.className] - An optional class name to apply to the dialog.
 * @param {string[]} [props.closeKeys] - An optional array of keyboard keys to close the dialog.
 * @param {string[]} [props.openKeys] - An optional array of keyboard keys to open the dialog.
 * @param {boolean} [props.closeOnOutsideClick=true] - Whether to close the dialog when clicking outside of it.
 * @param {boolean} [props.closeOnEscape=true] - Whether to close the dialog when pressing the Escape key.
 *
 * @example
 * <Dialog isOpen={isOpen} setOpen={setOpen} closeKeys={['Escape']}>
 *   <p>Hello, world!</p>
 * </Dialog>
 */
const Dialog = ({
  isOpen,
  setOpen,
  children,
  className,
  closeKeys = ["Escape"],
  openKeys = [],
  closeOnOutsideClick = true,
  closeOnEscape = true,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && closeKeys.includes(event.key)) {
        setOpen(false);
      }
      if (!isOpen && openKeys.includes(event.key)) {
        setOpen(true);
      }
    },
    [isOpen, setOpen, closeKeys, openKeys]
  );

  const handleOutsideClick = useCallback(
    (event: TouchEvent | MouseEvent) => {
      if (
        closeOnOutsideClick &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [closeOnOutsideClick, dialogRef, setOpen]
  );

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        setOpen(false);
      }
    },
    [closeOnEscape, setOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleOutsideClick);
    document.removeEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleKeyDown, handleOutsideClick, handleEscape]);

  return (
    <>
      {isOpen && (
        <div className="fixed flex justify-center items-center inset-0 z-50 backdrop-blur-sm">
          <div ref={dialogRef} className={className || ""}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export { Dialog };
