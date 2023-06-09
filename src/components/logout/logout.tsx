import { IconButton, Tooltip } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useUserDispatch } from "../../context/user-context";

export function Logout() {
  const dispatch = useUserDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(null);
  };

  return (
    <Tooltip label="Logout" placement="bottom">
      <IconButton
        onClick={logout}
        icon={<MdLogout size="1rem" />}
        aria-label="Logout"
        _hover={{
          bg: "red.100",
          color: "red.500",
        }}
      />
    </Tooltip>
  );
}
