import axios from 'axios';
// axios.defaults.withCredentials = true; //enable cookie
const api = axios.create({
  //importante para las cookies y config de cors poner la direccion del navegador, si es localhost usa localhost si es una ip pon la ip
  baseURL: 'http://localhost:3000/rh', // Pendiente investigar como usar .env
  timeout: 5000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});

export default api;