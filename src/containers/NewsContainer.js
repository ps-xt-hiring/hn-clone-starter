import { connect } from 'react-redux';
import News from '../components/News';
import { getNews, hideNews, increaseVoteCount, sortNews } from '../redux/action';

const mapStateToProps = state => ({
    newsListingData: state.newsReducer.newsListingData,
    loading: state.newsReducer.loading,
    hideNews: state.newsReducer.hideNews,
    page: state.newsReducer.page,
    sortBy: state.newsReducer.sortBy
});

const mapDispatchToProps = dispatch => ({
    getNews: (page) => dispatch(getNews(page)),
    hideNews: (newsId, newsList) => dispatch(hideNews(newsId, newsList)),
    increaseVoteCount: (objId, item) => dispatch(increaseVoteCount(objId, item)),
    sortNews: (sortBy, newsList) => dispatch(sortNews(sortBy, newsList))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News);
