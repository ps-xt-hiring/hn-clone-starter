export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (storageKeyName) => {
  const itemValue = JSON.parse(localStorage.getItem(storageKeyName));
  return itemValue;
};
