import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

const defaultValue: AuthContextType = {
  token: null,
  setToken: () => {},
  clearToken: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthProviderProps {
  children: ReactNode; // Definiendo el tipo para 'children'
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setTokenState(tokenFromStorage);
    }
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
