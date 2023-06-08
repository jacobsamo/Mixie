import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  open: false,
};

const AuthContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        open: true,
      };
    case 'CLOSE':
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAuthClick = () => {
    dispatch({ type: 'OPEN' });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleAuthClick,
        handleClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
