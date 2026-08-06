import type { CSSObject } from '@emotion/react';
import { alpha, createTheme, type Components, type Theme } from '@mui/material/styles';

/*
 * -------------------------------------------------------------
 *  CSS Selector Cheat Sheet:
 *  [Syntax]     [Type]       [Notes]
 *  -------------------------------------------------------------
 *  &            Root         Must lead; use only once.
 *  .selector    Compound     Applies to self (no space).
 *   .selector   Descendant   Targets child elements (needs leading space).
 * -------------------------------------------------------------
 */

const customTextFieldStyles = (themeColor: string): CSSObject => ({
  '& .MuiInputLabel-root': {
    color: alpha(themeColor, 0.6),
  },
  '&:has(.MuiOutlinedInput-root:hover)': {
    "& .MuiInputLabel-root": {
      color: alpha(themeColor, 0.9)
    }
  },
  '& .MuiOutlinedInput-root': {
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(themeColor, 0.6)
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(themeColor, 0.9)
    }
  }
});

const customButtonOverrides: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      textTransform: 'none'
    }
  },
  variants: [
    {
      props: { color: 'secondaryDark' },
      style: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.secondary.dark, 0.6),
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.dark, 0.9)
        }
      })
    }
  ]
};

const customDialogOverrides: Components<Theme>['MuiDialog'] = {
  variants: [
    {
      props: {},
      style: ({ theme }) => ({
        '& .MuiDialog-container .MuiPaper-root.MuiDialog-paper': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          '& .MuiDialogContent-root .MuiDialogContentText-root': {
            color: theme.palette.primary.contrastText
          }
        }
      })
    }
  ]
}

const customTextFieldOverrides: Components<Theme>['MuiTextField'] = {
  styleOverrides: {
    root: {
      '& ::-ms-reveal': {
        display: 'none'
      }
    }
  },
  variants: [
    {
      props: { variant: 'outlined', color: 'secondary' },
      style: ({ theme }) => customTextFieldStyles(theme.palette.secondary.main)
    },
    {
      props: { variant: 'outlined', color: 'secondaryDark' },
      style: ({ theme }) => customTextFieldStyles(theme.palette.secondary.dark)
    }
  ]
};

const customTypographyOverrides: Components<Theme>['MuiTypography'] = {
  variants: [
    {
      props: { color: 'primaryDark' },
      style: ({ theme }) => ({
        color: theme.palette.primary.dark
      })
    }
  ]
};

const customComponentOverrides: Components<Theme> = {
  MuiButton: customButtonOverrides,
  MuiDialog: customDialogOverrides,
  MuiTextField: customTextFieldOverrides,
  MuiTypography: customTypographyOverrides
};

export const oceanTheme = createTheme({
  spacing: 1,
  components: customComponentOverrides,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0077b6',
      light: '#0096c7',
      dark: '#023e8a',
      contrastText: '#caf0f8'
    },
    secondary: {
      dark: '#48cae4',
      main: '#caf0f8',
      contrastText: '#023e8a'
    },
    accent: {
      main: '#f9ca24',
      light: '#dedcad'
    },
    text: {
      primary: '#bdbdbd',
      secondary: '#818181'
    }
  }
});

export const forestTheme = createTheme({
  spacing: 1,
  components: customComponentOverrides,
  palette: {
    mode: 'dark',
    primary: {
      main: '#31572c',
      light: '#4f772d',
      dark: '#132a13',
      contrastText: '#dce7ce'
    },
    secondary: {
      dark: '#90a955',
      main: '#cde7ce',
      contrastText: '#132a13'
    },
    accent: {
      main: '#f9ca24',
      light: '#dedcad'
    },
    text: {
      primary: '#bdbdbd',
      secondary: '#818181'
    }
  }
});