import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { findDomain, timeSince } from '../../utilities';
import localized from '../../utilities/localizationData.json';

const Listing = (props) => {
  const { productData, hideItems, upVote } = props;
  return (
    <React.Fragment>
      {productData.map((item) => {
        const objId = item.objectID;
        return (
          <article key={item.objectID} className="listing">
            <div className="listing__num-comments">
              {item.num_comments ? item.num_comments : 0}
            </div>
            <div
              className="listing__points"
            >
              {item.points ? item.points : 0}
            </div>
            <div
              className="listing__upVote"
              onClick={() => upVote(objId)}
              role="button"
              tabIndex="0"
              onKeyPress={() => upVote(objId)}
            >
              &nbsp;
            </div>
            <div className="listing__title">
              {item.title ? item.title : `${localized.en.TitleText}`}
              <span className="listing__title__description">
                {findDomain(item.url) ? <Link to="/" className="listing__title__description__linkDomain">{findDomain(item.url)}</Link> : `${localized.en.domainText}`} {localized.en.by}
                <address className="listing__title__description__userName">
                  {item.author ? item.author : null}
                </address>
                <time className="listing__title__description__postedWhen">
                  {/* {moment(item.created_at).fromNow()
                    ? moment(item.created_at).fromNow()
                    : null} */}
                  {timeSince(new Date(item.created_at))}
                </time>
                <button
                  className="listing__title__description__hide"
                  onClick={() => hideItems(objId)}
                  type="button"
                  onKeyUp={(e) => {
                    if (e.keyCode === '32' || e.keyCode === '13') {
                      hideItems(objId);
                    }
                  }
                  }
                >
                  {localized.en.hideText}
                </button>
              </span>
            </div>
          </article>
        );
      })}
    </React.Fragment>
  );
};
export default Listing;


Listing.propTypes = {
  productData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  hideItems: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
};
