export function updateLocalStorage(lsName, newValue) {
    if (localStorage.getItem(lsName) === null) {
        localStorage.setItem(lsName, JSON.stringify([]));
    }

    let lsData = JSON.parse(localStorage.getItem(lsName));
    lsData.push(newValue);
    localStorage.setItem(lsName, JSON.stringify(lsData));
}

export function formatDate(date) {
    let itemDate = new Date(date),
        seconds = Math.floor((new Date() - itemDate) / 1000),
        interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
}

export function getDomainName(url) {
    let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    } else {
        return null;
    }
}