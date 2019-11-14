import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import findDomain from '../../utilities';

class Listing extends Component {
  render() {
    const { productData, hideItems, upVote } = this.props;
    return (
      <React.Fragment>
        {productData.map((item) => {
          const objId = item.objectID;
          return (
            <div key={item.objectID} className="listing">
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
                onKeyPress={() => upVote(objId)}>
                &nbsp;
              </div>
              <div className="listing__title">
                {item.title ? item.title : 'Title Not Found'}
                <span className="listing__title__container">
                  <span className="listing__title__container__linkDomain">
                    {findDomain(item.url)
                      ? `(${findDomain(item.url)})`
                      : 'Domain is not found'}
                  </span>
                  by
                  {' '}
                  <span className="listing__title__container__userName">
                    {item.author ? item.author : null}
                  </span>
                  <span className="listing__title__container__postedWhen">
                    {moment(item.created_at).fromNow()
                      ? moment(item.created_at).fromNow()
                      : null}
                  </span>
                  <span
                    className="listing__title__container__hide"
                    onClick={() => hideItems(objId)}
                    role="button"
                    tabIndex="0"
                    onKeyPress={() => hideItems(objId)}
                  >
                    [Hide]
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
export default Listing;


Listing.propTypes = {
  productData: PropTypes.array.isRequired,
  hideItems: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
};
