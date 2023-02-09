import React, { useCallback, useEffect, useState } from "react";

function Dialog(props: any) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // handle key events to open or close the dialog
  const handleKeyOpen = useCallback((event: any) => {
    if (event.key in props.keyOpen) setDialogOpen(true);
  }, [props.keyOpen]);

  const handleKeyClose = useCallback((event: any) => {
    if (event.key in props.keyClose) setDialogOpen(false);
  }, [props.keyClose]);

  // add key event listeners
  useEffect(() => {
    if (props.keyOpen) {
      document.addEventListener("keyup", handleKeyOpen);
      return () => document.removeEventListener("keyup", handleKeyOpen);
    }
  }, [handleKeyOpen, props.keyOpen]);

  useEffect(() => {
    if (props.keyClose) {
      document.addEventListener("keyup", handleKeyClose);
      return () => document.removeEventListener("keyup", handleKeyClose);
    }
  }, [handleKeyClose, props.keyClose]);

  useEffect(() => {
    if (props.open) {
      setDialogOpen(props.open);
    }
  }, [props.open]);

  const handleOpen = () => {
    setDialogOpen(true);
    props.setOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    props.setOpen(false);
  };

  const handleToggle = () => {
    setDialogOpen(!dialogOpen);
    props.setOpen(!dialogOpen);
  };

  return (
    <div
      style={{
        display: dialogOpen ? "block" : "none",
      }}
      className={`fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm w-full h-full ${props.className}`}
    >
      <section className={props.className}>{props.children}</section>
    </div>
  );
}

export { Dialog };
