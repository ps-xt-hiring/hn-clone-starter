/* eslint no-param-reassign: ["error", { "props": false }] */

const initialState = {
  newsList: [],
  currentPage: 1,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEWS_FEED_SUCCESS':
      return {
        ...state,
        newsList: [...action.payload],
        currentPage: action.currentPage,
      };

    case 'NEWS_FEED_FAILURE':
      return {
        ...state,
        newsList: [],
        currentPage: action.currentPage,
      };

    case 'Toggle_Vote': {
      let upVotedIdArray = [];
      const upVotedId = localStorage.getItem('upVotedId');
      if (upVotedId) {
        upVotedIdArray = JSON.parse(upVotedId);
      }
      const newsList = state.newsList.map((item) => {
        if (item.objectID === action.payload.objectID) {
          if (item.isVoted) {
            upVotedIdArray.splice(upVotedIdArray.indexOf(item.objectID), 1);
            delete item.isVoted;
          } else {
            upVotedIdArray.push(action.payload.objectID);
            item.isVoted = true;
          }
        }
        return item;
      });

      localStorage.setItem('upVotedId', JSON.stringify(upVotedIdArray));
      return {
        ...state,
        newsList: [...newsList],
      };
    }
    default:
      return state;
  }
};
