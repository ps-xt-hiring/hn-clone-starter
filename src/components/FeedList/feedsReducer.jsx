export default function FeedsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_FEEDS_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_FEEDS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FEEDS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return 'error';
  }
}
