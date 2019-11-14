import React from 'react';
import classNames from 'classnames';
import { timeDifference } from '../../utils/generalUtils';

function Listitem(props) {
    let { record } = props;
    let url = record.url ? new URL(record.url) : '';
    return (
        <React.Fragment>
            <tr>
                <td>
                    <table border="0" cellPadding="0" cellSpacing="0" className="itemlist">
                        <tbody>
                            <tr className="athing">
                                <td align="right" valign="top" className="title">
                                    <span className="rank">{` ${record.num_comments || 0}`}.</span>
                                    <span className="rank">{record.relevancy_score || 0}. </span>
                                </td>
                                <td valign="top" className="votelinks">
                                    <center><a href="javascript:void(0)" onClick={props.handleVote.bind(this, props.recordIndex)}>
                                        <div className="votearrow" title="upvote"></div>
                                    </a></center>
                                </td>
                                <td className="title"><a
                                    href="javascript:void(0)" className="storylink">{record.title || 'This post does not have any title'}</a><span className="sitebit comhead">
                                        ( <a href="javascript:void(0)">
                                            <span className="sitestr">{url.host}</span>
                                        </a>)
                              </span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"></td>
                                <td className="subtext">
                                    <span className="score">{record.points} points</span> {'by '}
                          <a href="javascript:void(0)" className="hnuser">{record.author}</a>
                                    <span className="age">
                                        <a href="javascript:void(0)">{` ${timeDifference(new Date(), new Date(record.created_at))}`}
                                        </a>
                                    </span>
                                    <a href="javascript:void(0)" onClick={props.handleHide.bind(this, props.recordIndex)}> {' | [hide] '}</a> </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr id="pagespace" className="spaceElem" />
        </React.Fragment>
    );
}

export default Listitem;
