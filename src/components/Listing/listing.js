import React, { Component } from 'react';
import moment from 'moment';
import findDomain from '../../utilities';

class Listing extends Component {
  render() {
    const { productData } = this.props;
    return (
      <React.Fragment>
        {productData.map(item => {
          let objId = item.objectID;
          return (
            <div key={item.objectID} className="listing">
              <div className="listing__num-comments">
                {item.num_comments ? item.num_comments : 0}
              </div>
              <div
                className={
                  item.points <= 500
                    ? "listing__points item500"
                    : item.points <= 1000
                    ? "listing__points item1000"
                    : item.points <= 1500
                    ? "listing__points item1500"
                    : item.points <= 2000
                    ? "listing__points item2000"
                    : item.points <= 2500
                    ? "listing__points item2500"
                    : item.points <= 3000
                    ? "listing__points item3000"
                    : "listing__points"
                }
              >
                {item.points ? item.points : 0}
              </div>
              <div
                className="listing__upVote"
                onClick={() => this.props.upVote(objId)}
              ></div>
              <div className="listing__title">
                {item.title ? item.title : "Title Not Found"}
                <span className="listing__title__container">
                  <span className="listing__title__container__linkDomain">
                    {findDomain(item.url)
                      ? `(${findDomain(item.url)})`
                      : "Domain is not found"}
                  </span>
                  by{" "}
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
                    onClick={() => this.props.hideItems(objId)}
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
