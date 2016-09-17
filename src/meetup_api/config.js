import axios from 'axios';
import env from '../env';

const authObject = {
  key: env.meetup.key,
};

export const get = (url, params) => {
  const newParams = Object.assign({}, params, authObject);
  const newUrl = `${env.meetup.baseUrl}${url}`;
  return axios.get(
    newUrl, {
      params: newParams,
    }
  );
};

export const post = (url, params) => {
  const newParams = Object.assign({}, params, authObject);
  const newUrl = `${env.meetup.baseUrl}${url}`;
  return axios.post(
    newUrl,
    newParams
  );
};
