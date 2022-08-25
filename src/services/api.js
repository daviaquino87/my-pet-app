import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      window.top.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export { api };
