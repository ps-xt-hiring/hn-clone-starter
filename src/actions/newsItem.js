export const upVoteClick = itemId => {
    return {
      type: actionTypes.UPVOTE_NEWSITEM,
      itemId
    };
  };
  
  export const hideListClick = itemId => {
    return {
      type: actionTypes.HIDE_NEWS_ITEM,
      itemId
    };
  };