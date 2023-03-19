import React, { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
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
  closeKeys = ["Escape"],
  openKeys = [],
  closeOnOutsideClick = true,
  closeOnEscape = true,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Key pressed: ', event.key);
      if (isOpen && closeKeys.includes(event.key)) {
        setOpen(false);
      }
      if (!isOpen && openKeys.includes(event.key)) {
        setOpen(true);
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [
    isOpen,
    setOpen,
    closeKeys,
    openKeys,
    closeOnOutsideClick,
    closeOnEscape,
  ]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="dialog-box" ref={dialogRef}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export { Dialog };
