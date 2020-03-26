/* eslint-disable */
/**
 * A factory class to handle local storage curd operations
 *
 * @class LocalStorage
 */

class LocalStorage {
  create(storeKey, storeValue) {
    const hasKey = this.hasStorage(storeKey);

    if (!hasKey) this.setStorage(storeKey, storeValue);

    return {
      update: value => this.setStorage(storeKey, value),
      fetch: () => this.fetchStorage(storeKey),
      remove: () => this.clearStorage(storeKey),
      currentStore: storeKey
    };
  }

  hasStorage(storeKey) {
    return !!localStorage.getItem(storeKey);
  }

  fetchStorage(storeKey) {
    const val = localStorage.getItem(storeKey);
    return JSON.parse(val) || {};
  }

  setStorage(storeKey, storeValue) {
    const val = JSON.stringify(storeValue);
    localStorage.setItem(storeKey, val);
  }

  clearStorage(storeKey) {
    localStorage.removeItem(storeKey);
  }
}

const instance = new LocalStorage();
Object.freeze(instance);

export default instance;
