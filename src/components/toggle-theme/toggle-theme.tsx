import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, SlideFade, useColorMode } from '@chakra-ui/react';

function InternIcon() {
  const { colorMode } = useColorMode();

  const isLight = colorMode === 'light';
  const isDark = colorMode === 'dark';

  const icon = {
    light: <MoonIcon />,
    dark: <SunIcon />,
  };

  return (
    <>
      <SlideFade
        style={{
          position: 'absolute',
        }}
        in={isLight}
        offsetY="-20px"
      >
        {icon[colorMode]}
      </SlideFade>
      <SlideFade
        style={{
          position: 'absolute',
        }}
        in={isDark}
        offsetY="-20px"
      >
        {icon[colorMode]}
      </SlideFade>
    </>
  );
}

export function ToggleTheme() {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Toggle theme"
      icon={<InternIcon />}
    />
  );
}
