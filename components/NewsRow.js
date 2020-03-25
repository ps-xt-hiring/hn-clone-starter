import React from 'react';
import { parseDomainFromUrl, convertToTimesAgo } from '../utils/helper';
import NewsPoint from './NewsPoint';
import Anchor from './shared/Anchor';
import Button from './shared/Button';

export default function NewsRow(props) {
    if (!props.title) return null;
    if (props.hideActivity[props.objectID]) return null;
    return (
        <article className="row">
            <div>
                {/* <span className="comment">{props.comments}</span> */}
                <NewsPoint {...props} />
            </div>

            <div className="detail-wrapper">
                <div>{props.title}</div>
                <div className="detail">
                    (<Anchor href={props.url} target="_blank" className="underline color-gray">{`${parseDomainFromUrl(props.url)}`}</Anchor>)
                    by <span className="color-black"> {props.author} </span>
                    <span> {convertToTimesAgo(props.created_at)} </span>
                    [<Button className="btn hide-btn" onClick={(event) => {
                        props.handleHideClick(props.objectID, props.itemIndex);
                    }}>hide</Button>]
                </div>
            </div>
            <style jsx="true">{`
            .detail-wrapper {
                display: flex;
                flex-direction:row;
                align-items: center;
            }
            .detail {
                color: #808080;
                font-size: 12px;
                margin-left: 5px;
            }
            .row {
                padding: 5px;
            }
            .row:nth-child(even) {
                background-color: #f2f2f2;
            }

            .row>div:nth-child(2n-1) {
                width: 10%;
                float: left;
            }
            
            .comment {
                margin-left: 50px;
            }
            @media (max-width: 600px) {
                .detail-wrapper {
                  flex-direction: column;
                }
                .row > div:first-child {
                    min-width: 80px;
                }
              }
            `}</style>
        </article>
    )
}