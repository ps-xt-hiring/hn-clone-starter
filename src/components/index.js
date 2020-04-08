import { connect } from 'react-redux';
import {fetchNewsIds, updateVotesAction} from './actions';
import HackerNews from './HackerNews';

const mapStateToProps = state => ({
  news: state.app.news,
  isFetching: state.app.isFetching,
  error: state.app.error,
  pageNo: state.app.pageNo,
});

const mapDispatchToProps = dispatch => ({
  fetchNewsForFirstPage: pageNo => dispatch(fetchNewsIds(pageNo)),
  updateVotesAction: id => dispatch(updateVotesAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HackerNews);
