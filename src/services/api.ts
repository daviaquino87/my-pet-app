import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const privateApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('@data');
  if (token) {
    const data = JSON.parse(token);
    config.headers.Authorization = `Baerer ${data.token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error.response.status);
    if (error.response.status === 401) {
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export { api };
