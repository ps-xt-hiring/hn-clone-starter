import {
  takeLatest, call, put,
} from 'redux-saga/effects';
import * as types from './types';
import { BASEURL } from '../../common/config';

export function* getNewsWatcherSaga() {
  // eslint-disable-next-line no-use-before-define
  yield takeLatest(types.GET_NEWS_API_CALL_REQUEST, workerSaga);
}

export function* workerSaga({ page }) {
  try {
    const url = `${BASEURL}?tags=front_page&page=${page}`;

    const data = yield call(() => fetch(url)
      .then(res => res.json())
      .then(res => res));

    if (data) {
      yield put({ type: types.GET_NEWS_API_CALL_SUCCESS, data });
    } else {
      yield put({ type: types.GET_NEWS_API_CALL_FAILURE, error: 'error occured during get news' });
    }
  } catch (error) {
    yield put({ type: types.GET_NEWS_API_CALL_FAILURE, error });
  }
}
