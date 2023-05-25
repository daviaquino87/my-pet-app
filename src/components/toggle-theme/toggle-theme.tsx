import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = colorMode === 'light' ? <SunIcon /> : <MoonIcon />;

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Toggle theme"
      icon={icon}
    />
  );
}
