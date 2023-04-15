import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
});

function extractTotalCountFromHeaders(response: AxiosResponse) {
  const totalCount = response.headers['x-total-count'];
  if (totalCount) {
    return {
      ...response,
      data: {
        list: response.data,
        total: +totalCount,
      },
    };
  }
  return response;
}

instance.interceptors.response.use(
  (res) => {
    const processedData = extractTotalCountFromHeaders(res);
    return processedData;
  },
);

export function fetcher<T>(config: AxiosRequestConfig) {
  return instance.request<T>(config).then(
    (res) => res.data,
    (err) => Promise.reject(err),
  );
}

export default instance;
