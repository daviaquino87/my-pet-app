import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-project-pet.herokuapp.com',
});

// api.interceptors.request.use(
//   function (config) {
//     api.axios.defaults.headers.common['Authorization'] =
//       localStorage.getItem('token');
//     console.log(config);
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `${localStorage.getItem('token')}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { api };
