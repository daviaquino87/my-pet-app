import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/auth/login';
import { RegisterPage } from '../pages/auth/register';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<h3>hi</h3>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
