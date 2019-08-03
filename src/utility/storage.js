export function getStorage(key = '') {
    return JSON.parse(localStorage.getItem(key) || '{}');
}

export function setStorage(data = {}) {
    const { storageKey, objectID, value } = data;
    const storageData = getStorage(storageKey)
    storageData[objectID] = value;
    localStorage.setItem(storageKey, JSON.stringify(storageData));
}

export function clearStorage(key = '') {
    localStorage.removeItem(key);
}