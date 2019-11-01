import Axios from 'axios';

import { HN_BASE_URL } from '../ServiceURL';

const instance = Axios.create({
  baseURL: HN_BASE_URL,
});

export default instance;
