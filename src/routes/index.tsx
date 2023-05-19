import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/auth/login';
import { RegisterPage } from '../pages/auth/register';
import { HomePage } from '../pages/home';
import { UserProvider } from '../context/user-context';
import { NewSpendingPage } from '../pages/new';
import { LayoutPage } from '../pages/layout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserProvider />}>
        <Route element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="/new" element={<NewSpendingPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
