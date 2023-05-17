import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/auth/login';
import { RegisterPage } from '../pages/auth/register';
import { HomePage } from '../pages/home';
import { UserProvider } from '../context/user-context';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserProvider />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
