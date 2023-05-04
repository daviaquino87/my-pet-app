import toast from 'react-hot-toast';
import { api } from '../../services/api';

function ButtonLogout() {
  function logout(event) {
    api
      .post(`${process.env.REACT_APP_BASE_URL}/logout`)
      .then((result) => {
        toast('See you later!', {
          icon: '👏',
        });
        setTimeout(() => {
          localStorage.clear();
          window.top.location.replace('/');
        }, 900);
      })
      .catch((err) => {
        alert('algo deu errado');
        console.log(err);
      });
  }

  return (
    <div className="group-logout">
      <button className="button-component logout" onClick={logout}>
        Logout
      </button>
      <img src="/images/Vector.png" />
    </div>
  );
}

export default ButtonLogout;
