import React from 'react';

import { FeedHeader } from './feed-header';
import { FeedFooter } from './feed-footer';
import { Feeds } from './feed';

export const FeedContainer = props => (
  <div>
    <FeedHeader />
    <Feeds feeds={props.feeds} />
    <FeedFooter
      loadMore={props.loadMore}
      pageNum={props.pageNum}
    />
  </div>
);
