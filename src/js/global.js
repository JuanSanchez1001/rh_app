import axios from 'axios';
axios.defaults.withCredentials = true; //enable cookie
const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/rh', // Pendiente investigar como usar .env
  timeout: 5000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});

export default api;