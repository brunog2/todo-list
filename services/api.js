import axios from 'axios';

const api = axios.create({
  baseURL: 'http://young-lowlands-55392.herokuapp.com'
});

export default api;