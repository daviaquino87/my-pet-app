import { Toaster } from 'react-hot-toast';
import ButtonReturn from '../ButtonReturn/ButtonReturnComponent';
import AppLogo from './AppLogo';
import ButtonLogout from './ButtonLogout';
import './index.css';

function NavBar({ title, canBack }) {
  return (
    <header className="nav-bar-group flex column ai-center jc-center">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="flex ai-center jc-center group-nav">
        <div className="flex ai-center jc-center group-nav-itens">
          {canBack ? <ButtonReturn /> : <AppLogo />}
          <h2 className="Nav-bar-title">{title}</h2>
        </div>
        <ButtonLogout />
      </div>
    </header>
  );
}

export default NavBar;
