export default class ApiService {
    async get(url) {
        try {
            const fetchResult = fetch(url)
            const response = await fetchResult;
            const jsonData = await response.json();
            return [null, jsonData];
        } catch (error) {
            console.log('Fetch Error :-S', error);
            return [error, null];
        }
    }
}