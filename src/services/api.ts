import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mypet.codewizard.com.br',
});

export { api };
