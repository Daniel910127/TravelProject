import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosWithJWT = () => {
  const [axiosInstance, setAxiosInstance] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('token'); // 替换为你的实际 JWT Token
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api',
      headers: {
        common: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    });

    // console.log('instance created',instance)
    setAxiosInstance(instance);

    return () => {
      // 在组件卸载时清理资源（可选）
      setAxiosInstance(null);
    };
  }, []);

//   console.log('return',axiosInstance)
  return axiosInstance;
};

export default useAxiosWithJWT;
