/**
 * Save data to local store
 * @param {*} state
 */
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore
  }
};

/**
 * loads data from local store
 * @param {*} state
 */
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export default {
  saveState,
  loadState,
};
