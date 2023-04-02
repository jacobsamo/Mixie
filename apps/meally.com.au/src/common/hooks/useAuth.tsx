import { useState } from 'react';
import { auth } from '@lib/config/firebase';
// import AuthDialog from '@components/elements/AuthDialog';

function useAuth() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = (callback: Function) => {
    if (auth.currentUser) {
      callback();
      setIsAuthenticated(true);
    } else {
      setOpen(true);
    }
  };

  const handleAuthDialogClose = () => {
    if (auth.currentUser) {
      setIsAuthenticated(true);
    }
    setOpen(false);
  };

  return { handleAuthClick, handleAuthDialogClose };
}

export default useAuth;