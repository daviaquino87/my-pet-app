import { api } from '../../services/api';

function ButtonLogout() {
  function logout(event) {
    api
      .post(`${process.env.REACT_APP_BASE_URL}/logout`)
      .then((result) => {
        alert('até mais!');
        localStorage.clear();
        window.top.location.replace('/');
      })
      .catch((err) => {
        alert('algo deu errado');
        console.log(err);
      });
  }

  return (
    <button className="button-component" onClick={logout}>
      Logout
    </button>
  );
}

export default ButtonLogout;
