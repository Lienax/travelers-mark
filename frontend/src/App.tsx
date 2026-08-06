import { useEffect, useState } from 'react';
import { router } from './router';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { oceanTheme, forestTheme } from './theme/theme';
import { RouterProvider } from 'react-router';

export default function App() {
  const [theme, setTheme] = useState(forestTheme);

  useEffect(() => {
    const timer = setInterval(() => {
      setTheme((prevTheme) => (prevTheme === oceanTheme ? forestTheme : oceanTheme));
    }, 15000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}