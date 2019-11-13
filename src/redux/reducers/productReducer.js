const initialState = {
  items: [],
  pagination: 1,
  hide: false
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      //  console.log(action.newItems + " " + "test......")
      return {
        ...state,
        items: action.payload.hits,
        pagination: action.newItems
      };

    case "Hide_PRODUCTS":
      return { ...state, items: action.payload };
    case "UP_VOTES":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
