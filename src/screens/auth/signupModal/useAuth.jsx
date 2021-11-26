import React, { useState, useCallback, useContext } from "react";
export const AuthContext = React.createContext(false);

export const AuthProvider = ({ children }) => {
  const [authModalVisibility, setAuthModalVisibility] = useState(false);
  const toggleAuthModal = useCallback(() => {
    setAuthModalVisibility(!authModalVisibility);
  }, [authModalVisibility]);
  return (
    <AuthContext.Provider value={{ authModalVisibility, toggleAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};
export const withAppointmentModal = (component) => {
  return <AuthProvider>{component}</AuthProvider>;
};

export const useAppointment = () => {
  return useContext(AuthContext);
};
