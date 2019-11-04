import axios from 'axios';
import {
  takeLatest, call, put,
} from 'redux-saga/effects';
import * as types from './types';
import { BASEURL } from '../../common/config';

export function* getNewsWatcherSaga() {
  // eslint-disable-next-line no-use-before-define
  yield takeLatest(types.GET_NEWS_API_CALL_REQUEST, workerSaga);
}

export function fetchData(page) {
  const url = `${BASEURL}/`;
  const params = { tags: 'front_page', page };

  return axios.get(url, { params })
    .then(val => val)
    .catch(err => err);
}

export function* workerSaga({ page }) {
  try {
    const response = yield call(fetchData, page);
    if (response && response.status === 200) {
      const { data } = response;

      yield put({ type: types.GET_NEWS_API_CALL_SUCCESS, data });
    } else {
      yield put({ type: types.GET_NEWS_API_CALL_FAILURE, error: 'error occured during get news' });
    }
  } catch (error) {
    yield put({ type: types.GET_NEWS_API_CALL_FAILURE, error });
  }
}
