import { Flex, Spinner } from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IAuthContext } from "./auth-context";

const UserContext = createContext<IAuthContext | null>(null);

const UserDispatchContext = createContext<
  Dispatch<SetStateAction<IAuthContext | null>>
>(() => {});

export function UserProvider() {
  const [user, setUser] = useState<IAuthContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("@data");
    if (userData) {
      setLoading(false);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const { pathname } = useLocation();

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

  // TODO: this is a bad practice
  const [, jwtData] = user?.token.split(".");
  const tokenData = JSON.parse(window.atob(jwtData));

  const now = Math.round(Date.now() / 1000);

  if (now >= tokenData.exp) {
    return (
      <Navigate
        to={{
          pathname: "/login",
          // TODO: use state
          search: "redirectTo=" + pathname,
        }}
        replace
      />
    );
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
