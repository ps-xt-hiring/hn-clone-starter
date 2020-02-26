import React from 'react';
import PropTypes from 'prop-types';
import './HNFooter.css';

export default function HNFooter(props) {
  const moreClickHandler = () => {
    const { currentPage: currentPageNo, totalPage, getHackerNewsData } = props.actiondata;
    if (currentPageNo <= totalPage) {
      getHackerNewsData(currentPageNo + 1);
    }
  };
  return (
    <div className="hn-footer">
      <button
        type="button"
        onClick={moreClickHandler}
        onKeyDown={moreClickHandler}
      >
        More
      </button>
    </div>
  );
}

HNFooter.propTypes = {
  actiondata: PropTypes.objectOf(PropTypes.any).isRequired,
};
