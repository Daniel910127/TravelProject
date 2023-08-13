import axios from 'axios';
import { useSession } from '../contexts/SessionContext';

export const useAuthorizedAxios = () => {
  const { access } = useSession();
  axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  return axios;
};
