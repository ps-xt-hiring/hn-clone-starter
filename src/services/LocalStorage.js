export default class LocalStorage {
     static get(key) {
        return localStorage.getItem(key);
    }
     static save(key, item) {
        localStorage.setItem(key, item);
    }
}