import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, ReactNode, SetStateAction, useState } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
  token: SetStateAction<string>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token: any) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState("");

  function authenticate(token: any) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
