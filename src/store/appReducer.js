const initialState = {
  message: null,
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message,
      };
    case 'LOADER_START':
      return {
        ...state,
        fetching: action.payload,
      };

    case 'LOADER_STOP':
      // debugger
      return {
        ...state,
        fetching: action.payload,
      };

    default:
      return state;
  }
};