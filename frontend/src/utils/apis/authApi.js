import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/';
const jwtToken = localStorage.getItem('accessToken'); 
console.log(jwtToken)
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      Authorization: `Bearer ${jwtToken}`,
    },
  },
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';