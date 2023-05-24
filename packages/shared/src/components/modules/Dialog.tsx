import React, { useRef } from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";

interface DialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  classNames?: {
    container?: string;
    overlay?: string;
  };
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
  classNames,
  closeKeys = [],
  openKeys = [],
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (closeKeys.includes(event.key)) {
      setOpen(false);
    } else if (openKeys.includes(event.key)) {
      setOpen(true);
    }
  }

  return (
    <>
      <HeadlessDialog
        open={isOpen}
        onClose={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        as="div"
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <HeadlessDialog.Panel
          className={`dark:bg-dark_grey dark:shadow-none shadow-main dark:text-white text-black bg-white rounded-md p-1 ${classNames?.overlay}`}
        >
          <div ref={dialogRef} className={classNames?.container}>
            {children}
          </div>
        </HeadlessDialog.Panel>
      </HeadlessDialog>
    </>
  );
};

export { Dialog };
