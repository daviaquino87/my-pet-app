import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { HeaderApp } from "../components/header";
import { Logo } from "../components/logo/logo";
import { Username } from "../components/username/username";
import { ToggleTheme } from "../components/toggle-theme/toggle-theme";
import { ReportsLink } from "../components/reports-link/reports-link";
import { Logout } from "../components/logout/logout";

export function LayoutPage() {
  return (
    <Flex direction="column" minH="100vh">
      <HeaderApp
        logo={<Logo />}
        user={<Username />}
        actions={
          <>
            <ToggleTheme />
            <ReportsLink />
            <Logout />
          </>
        }
      />
      <Flex flex={1} direction="column">
        <Outlet />
      </Flex>
    </Flex>
  );
}
