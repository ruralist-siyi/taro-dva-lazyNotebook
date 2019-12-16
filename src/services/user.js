import { createApiRequest } from '../utils/request';

export default {
  login: (data) => {
    createApiRequest('/user/logn', data, 'POST', false)
  }
}
