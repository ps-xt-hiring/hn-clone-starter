/**
 * Gets the stored value from LocalStorage
 * @param {string} storyId
 */
export const getLocalStorage = storyId => localStorage.getItem(storyId);

/**
 * Sets value to the LocalStorage
 * @param {Object} Story
 * @param {string} Story.storyId
 * @param {string} Story.points
 * @param {boolean} Story.isHidden
 */
export const setLocalStorage = ({
  storyId,
  points,
  isHidden,
}) => localStorage.setItem(storyId, JSON.stringify({ points, isHidden }));
