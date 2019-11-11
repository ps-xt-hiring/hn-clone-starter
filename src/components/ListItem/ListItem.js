import React from 'react';
import './ListItem.css';
import PropTypes from 'prop-types';
import * as Utils from '../../utils';

export default function ListItem(props) {
  function hide(e) {
    props.hide(e.target.id);
  }

  function voteUpdate(e) {
    props.voteUpdate(e.target.id);
  }
  const sortedItem = props.items.sort((a, b) => b.points - a.points);
  const items = sortedItem.map((a) => {
    if (!a.hide) {
      return (
        <tr key={a.objectID}>
          <td>{a.num_comments}</td>
          <td>{a.points}</td>
          <td>
            <div className="votearrow shwpntr" role="option" aria-selected="true" tabIndex="0" onClick={voteUpdate} id={a.objectID} onKeyPress={this.handleKeyPress} title="upvote" />
          </td>
          <td>
            <div className="article-row">
              <div className="article-attr article-ele">
                <div className="article-title">
                  <span className="pdlr">
                    <a href={a.url} className="bclr" target="_parent">
                      {a.title}
                    </a>
                  </span>
                  <span className="pdlr gclr">
(
{Utils.toBaseURL(a.url)}
)
</span>
                </div>
                <div className="article-ele">
                  <span className="gclr">



by
<span className="bclr">{a.author}</span>
                  </span>
                </div>
                <div className="article-ele gclr">
                  <span>
                    {Utils.convertMS(new Date() - new Date(a.created_at))}
                    {' '}



ago
{' '}

                  </span>
                  <span className="bclr shwpntr" role="option" aria-selected="true" tabIndex="0" onKeyPress={this.handleKeyPress} onClick={hide} id={a.objectID}>
                    {' '}
                    {' '}
                    {' '}



[hide]
{' '}
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    } return '';
  });
  return (
    <table className="news-table table-striped">
      <tbody>{items}</tbody>
    </table>
  );
}
ListItem.propTypes = {
  items: PropTypes.shape([]).isRequired,
  hide: PropTypes.func.isRequired,
  voteUpdate: PropTypes.func.isRequired,
};
