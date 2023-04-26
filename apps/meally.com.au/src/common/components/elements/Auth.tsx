import React, { createContext } from 'react';
import AuthDialog from './AuthDialog';
import useAuth from 'src/common/hooks/useAuth';
const AuthContext = createContext({});

const Auth = () => {
  const { dialogOpen, handleAuthClick, handleAuthDialogClose } = useAuth();
  return <AuthDialog open={dialogOpen} setOpen={handleAuthDialogClose} />;
};

export default Auth;
