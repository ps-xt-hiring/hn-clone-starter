import axios from 'axios';
import actionTypes from '../../components/NewsList/actionTypes';

class NewsAPI {
  constructor() {
    this.NEWS_PER_PAGE = 10;
    this.CURRENT_PAGE = 1;
    this.BASE_API_URL = 'https://hn.algolia.com/api/v1/search';
    this.COMPLETE_URL = '';
    /**
     * Build initial `API URl`
     */
    this.buildUrl();
  }

  /**
   * Builds `API URL` based on several parameters.
   */
  buildUrl() {
    this.COMPLETE_URL = `${this.BASE_API_URL}?hitsPerPage=${this.NEWS_PER_PAGE}&page=${this.CURRENT_PAGE}`;
  }

  /**
   * Loads next page from `API`.
   */
  loadMore() {
    this.CURRENT_PAGE += 1;
    this.buildUrl();
    this.fetch();
  }

  /**
   * Fetches the news list from the `API`.
   */
  fetch(dispatch = '') {
    if (dispatch) {
      /**
       * Set dispatch method to make it available in the class.
       */
      this.dispatch = dispatch;
    }

    /**
     * Set processing.
     */
    this.dispatch({ type: actionTypes.fetch });

    /**
     * Fetch news as per given `URL`.
     */
    axios(this.COMPLETE_URL).then((response) => {
      this.dispatch({
        type: actionTypes.success,
        payload: response.data.hits,
      });
    }).catch((error) => {
      this.dispatch({
        type: actionTypes.error,
        payload: error.message,
      });
    });
  }
}

export default NewsAPI;
