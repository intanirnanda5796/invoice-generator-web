import axios from 'axios';

class BaseService {

   static get = (url, params, token = null) => {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
    return new Promise((resolve, reject) =>
      axios
        .get(url, {
          params,
        })
        .then((response) => resolve(response.data))
        .catch((err) => reject(err))
    );
  };

  static getById = (url, id, params = null, token = null) => {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
    return new Promise((resolve, reject) =>
      axios
        .get(`${url}/${id}`, {
          params,
        })
        .then((response) => resolve(response.data))
        .catch((err) => reject(err))
    );
  };

  static post = (url, data, token = null) => {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
    return new Promise((resolve, reject) =>
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err))
    );
  };

  static delete = (url, id, token = null) => {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
    return new Promise((resolve, reject) =>
      axios
        .delete(`${url}/${id}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err))
    );
  };
}

export default BaseService;