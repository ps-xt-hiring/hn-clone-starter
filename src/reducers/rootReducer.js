export default function (state = {}, action) {
  return Object.assign({}, state, { appInitialized: true });
}
