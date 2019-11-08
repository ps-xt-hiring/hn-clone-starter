import { fromJS } from 'immutable';

const initialState = fromJS({
  fetching: false,
  error: false,
  data: [],
  activePage: 0,
});

export default initialState;
