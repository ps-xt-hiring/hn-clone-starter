import {
  takeLatest, call, put,
} from 'redux-saga/effects';
import * as constants from '../commonConstants';
import BASEURL from '../../../common/apiConfig';

export function* newsFetchSaga() {
  yield takeLatest(constants.FETCH_NEWS_API, fetchNewsHandlerSaga);
}

export function* fetchNewsHandlerSaga({ page }) {
  try {
    const url = `${BASEURL}?tags=front_page&page=${page}`;

    const data = yield call(() => fetch(url)
      .then(response => response.json())
      .then(response => response));

    if (data) {
      yield put({ type: constants.FETCH_NEWS_API_SUCCESS, data });
    } else {
      yield put({ type: constants.FETCH_NEWS_API_FAILURE, error: 'error occured during get news' });
    }
  } catch (error) {
    yield put({ type: constants.FETCH_NEWS_API_FAILURE, error });
  }
}
