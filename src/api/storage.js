export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (storageKeyName) => {
  const itemValue = localStorage.getItem(storageKeyName);
  return itemValue;
};
