import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nagowebi.beget.app',
});

export default instance;
