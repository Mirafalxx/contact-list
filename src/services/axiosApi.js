import axios from 'axios';

const USERS_URL = 'https://demo.sibers.com/users';

const axiosApi = axios.create({
  baseURL: USERS_URL,
});

export default axiosApi;
