import React, { Component } from 'react';
import './FrontPage.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hackerNewsActions from '../../api/services';
import HNHeader from './HN_Header/HNHeader';
import HNFooter from './HN_Footer/HNFooter';
import HNRow from './HN_Row/HNRow';

class FrontPage extends Component {
  state = {
    hnlist: [],
  };

  componentDidMount() {
    const { hackerNewsDispatchActions } = this.props;
    hackerNewsDispatchActions.getHackerNewsData();
  }

  componentWillReceiveProps(nextProps) {
    const { hnList } = nextProps.hackerNewsObject;
    this.setState({ hnlist: hnList });
  }

  hideHNRowHandler = (objectID) => {
    const { hnlist } = this.state;
    const { hackerNewsDispatchActions } = this.props;
    hackerNewsDispatchActions.removeObjFromHNData(hnlist, objectID);
  };

  upVoteHNewsHandler = (objectID) => {
    const { hnlist } = this.state;
    const { hackerNewsDispatchActions } = this.props;
    hackerNewsDispatchActions.upVoteHNews(hnlist, objectID);
  };

  render() {
    const { hackerNewsDispatchActions, hackerNewsObject } = this.props;
    const { getHackerNewsData } = hackerNewsDispatchActions;
    const { loading, currentPage, totalPage } = hackerNewsObject;
    const { hnlist } = this.state;
    return (
      <div>
        <HNHeader getHackerNewsData={getHackerNewsData} />

        <div className="hn-contents">
          <ul>
            {!loading
              && hnlist
              && hnlist.map(item => (
                <HNRow
                  key={JSON.stringify(item)}
                  {...item}
                  hideHNRowHandler={this.hideHNRowHandler}
                  upVoteHNewsHandler={this.upVoteHNewsHandler}
                />
              ))}
            {loading && <span>Loading...</span>}
            <li>
              <HNFooter
                actiondata={{ getHackerNewsData, currentPage, totalPage }}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hackerNewsObject: state.hackerNews,
});
const mapDispatchToProps = dispatch => ({
  hackerNewsDispatchActions: bindActionCreators(hackerNewsActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
