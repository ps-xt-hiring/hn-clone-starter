import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as newsBuilderActions from '../../store/actions/index';
import ListItemNews from '../ListItemNews/ListItemNews';
import './NewsSection.css';

class NewsSection extends Component {
  componentDidMount() {
    const { onInitNewsItems } = this.props;
    onInitNewsItems();
}

handleUpvoteClick = itemId => {
    const { onUpvoteClick } = this.props;
    onUpvoteClick(itemId);
};

render() {
  const { onInitNewsItems, items, onHideClick, pageNumber } = this.props;
  return (
    <Fragment>
      <ul className="listItem">
        {items && items.length ? (
            items.map(itemsData => {
            return (
              <ListItemNews
                hideListClick={itemId => onHideClick(itemId)}
                key={itemsData.objectID}
                {...itemsData}
            />
            );
          })
        ) : (
          <p className="loading">
            {items && items.length === 0
              ? "End of News"
              : "loading"}
          </p>
        )}
      </ul>
      {items && items.length ? (
          <input type="button"
          className="loadMore"
          value="More"
          onClick={() => {
            onInitNewsItems(pageNumber);
          }}
        />
      ) : (
        <button
        type="button"
          className="gotoFirstPage"
          onClick={() => {
            onInitNewsItems();
          }}
        >
          {items && items.length === 0 ? 'Go to first Page' : null}
        </button>
      )}
    </Fragment>
  );
}
}
const mapStateToProps = state => {
return {
  items: state.newsItems,
  pageNumber: state.pageNumber
};
};

const mapDispatchToProps = dispatch => {
return {
  onInitNewsItems: pageNumber =>
    dispatch(newsBuilderActions.initNewsItems(pageNumber || 0)),
  onUpvoteClick: itemId => dispatch(newsBuilderActions.upVoteClick(itemId)),
  onHideClick: itemId => dispatch(newsBuilderActions.hideListClick(itemId))
};
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(NewsSection);