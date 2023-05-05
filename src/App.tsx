import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { AuthPage } from './components/auth';
import { Card, CardBody } from '@chakra-ui/react';

function InitialPage() {
  return (
    <Card>
      <CardBody>
        <Link to="/login">Login</Link>
        &nbsp;
        <Link to="/register">Registrar</Link>
      </CardBody>
      <Outlet />
    </Card>
  );
}

export default function App() {
  return (
    <Routes>
      {/* convert to single componente */}

      <Route path="/" element={<InitialPage />}>
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
      </Route>
    </Routes>
  );
}
