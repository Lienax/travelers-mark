import '@mui/material/Button';
import '@mui/material/styles';
import '@mui/material/Tabs';
import '@mui/material/TextField';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primaryMain: true;
    primaryLight: true;
    secondaryDark: true;
  }
}

declare module '@mui/material/Tabs' {
  interface TabsPropsIndicatorColorOverrides {
    secondaryDark: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    text: true;
    secondaryDark: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    primaryDark: true;
  }
}