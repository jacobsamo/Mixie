import { useState } from 'react';
import { auth } from '@lib/config/firebase';
// import AuthDialog from '@components/elements/AuthDialog';

function useAuth() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = (callback?: Function) => {
    if (auth.currentUser) {
      callback ? callback() : null;
      setIsAuthenticated(true);
    } else {
      setDialogOpen(true);
    }
  };

  const handleAuthDialogClose = () => {
    if (auth.currentUser) {
      setIsAuthenticated(true);
    }
    setDialogOpen(false);
  };

  return { dialogOpen, handleAuthClick, handleAuthDialogClose };
}

export default useAuth;
