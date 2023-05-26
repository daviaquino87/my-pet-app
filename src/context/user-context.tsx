import { Flex, Spinner } from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IAuthContext } from './auth-context';

const UserContext = createContext<IAuthContext | null>(null);

const UserDispatchContext = createContext<
  Dispatch<SetStateAction<IAuthContext | null>>
>(() => {});

export function UserProvider() {
  const [user, setUser] = useState<IAuthContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('@data');
    if (userData) {
      setLoading(false);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        <Outlet />
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}
