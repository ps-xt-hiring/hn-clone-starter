export function service(url = '', data = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, data)
            if (response.ok) {
                const data = await response.json();
                resolve(data);
            } else {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
