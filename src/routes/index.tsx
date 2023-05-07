import { Route, Routes } from 'react-router-dom';
import { AuthPage } from '../components/auth';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<h3>hi</h3>} />
      <Route path="/login" element={<AuthPage type="login" />} />
      <Route path="/register" element={<AuthPage type="register" />} />
    </Routes>
  );
}
