import { createBrowserRouter, redirect } from 'react-router';
import Login from './pages/Login/Login';
import Lobby from './pages/Lobby/Lobby';

const backendUrl = 'https://localhost:58606'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
    action: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get('email');
      const password = formData.get('password');

      switch (formData.get('formType')) {
        case 'login': {
          try {
            const response = await fetch(`${backendUrl}/auth/local/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
              return await response.json();
            }

            return redirect('/game');
          }
          catch {
            return { description: 'Server unavailable' };
          }
          break;
        }
        case 'register': {
          const confirmPassword = formData.get('confirmPassword');
          if (password !== confirmPassword) {
            return { description: 'Password does not match' };
          }
          try {
            const response = await fetch(`${backendUrl}/auth/local/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
              return await response.json();
            }
            else {
              return redirect('/game');
            }
          }
          catch {
            return { description: 'Server unavailable' };
          }
          break;
        }
        default:
          return { description: 'Undefined formType' };
          break;
      }
    }
  },
  {
    path: '/game',
    Component: Lobby
  }
]);