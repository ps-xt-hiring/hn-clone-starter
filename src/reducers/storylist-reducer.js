import { SET_STORY_LIST } from "../utils/constants.js";

const initialState = {
  list: {}
};

export default function storyList(state = initialState, { type, payload }) {
  switch (type) {
    case SET_STORY_LIST:
      return { ...state, list: payload };

    default:
      return state;
  }
}
