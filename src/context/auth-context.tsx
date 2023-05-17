import { ReactNode, createContext, useContext, useState } from 'react';

export interface IAuthContext {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

type AuthDispatchContextType = (auth: IAuthContext) => void;

const AuthContext = createContext<IAuthContext | null>(null);

const AuthDispatchContext = createContext<AuthDispatchContextType>(() => {});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthData] = useState<IAuthContext>({} as IAuthContext);

  return (
    <AuthContext.Provider value={authData}>
      <AuthDispatchContext.Provider value={setAuthData}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}
