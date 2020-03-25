import actionTypes from "../../components/NewsList/actionTypes";
import axios from "axios";

class FetchNews {
    
    NEWS_PER_PAGE = 10;
    CURRENT_PAGE = 1;
    
    BASE_API_URL = 'https://hn.algolia.com/api/v1/search';
    COMPLETE_URL = ''

    constructor(dispatch) {
        /**
         * Set dispatch method to make it available in the class.
         */
        this.dispatch = dispatch
        
        /**
         * Build initial `API URl`
         */
        this.buildUrl();
    }

    /**
     * Builds `API URL` based on several parameters.
     */
    buildUrl = () => {
        this.COMPLETE_URL = `${this.BASE_API_URL}?hitsPerPage=${this.NEWS_PER_PAGE}&page=${this.CURRENT_PAGE}`;
    }

    /**
     * Loads next page from `API`.
     */
    loadMore = () => {
        this.CURRENT_PAGE += 1;
        this.buildUrl();
        this.fetchNews();
    }

    /**
     * Fetches the news list from the `API`.
     */
    fetchNews = () => {
        /**
         * Set processing.
         */
        this.dispatch({ type: actionTypes.fetch })
        
        /**
         * Fetch news as per given `URL`.
         */
        axios(this.COMPLETE_URL).then(response => {
            this.dispatch({
                type: actionTypes.success,
                payload: response.data.hits
            })
        }).catch(error => {
            this.dispatch({
                type: actionTypes.error,
                payload: error.message
            })
        })
    }

}

export default FetchNews