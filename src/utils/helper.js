/**
 * Hides news items
 * @param {*} newsId 
 */
const setNewsAsHidden = (newsId) => {
    if (!newsId || !localStorage || !('length' in localStorage)) {
        return;
    }

    const hiddenItems = getHiddenNews();    
    hiddenItems.push(newsId);
    localStorage.setItem('hnHiddenNews', hiddenItems.join(','))
}

/**
 * Fetches hidden ids from local storage and returns array of ids.
 */
const getHiddenNews = () => {
    if (!localStorage || !('length' in localStorage)) {
        return [];
    }

    let hiddenItems = localStorage.getItem('hnHiddenNews');
    hiddenItems = hiddenItems ? hiddenItems.split(',') : [];
    return hiddenItems;
}

/**
 * Parses url and extracts domain of the url.
 * @param {*} url 
 */
const getDomainFromUrl = (url = '') => {
    if (!url) {
        return url;
    }

    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }

    return url;
}

/**
 * Calculates the duration from the given date to now.
 * @param {*} date 
 */
const getTimeDuration = (date) => {
    if (!date) {
        return ''
    }

    const now = new Date();
    const dateFrom = new Date(date)
    if (!dateFrom || !(dateFrom instanceof Date)) {
        return '';
    }

    const difference = Math.abs(now - dateFrom) / 1000;

    /**
     * get total years between two dates
     */
    const years = Math.floor(difference / (86400 * 365));
    if (years >= 1) {
        return `${years} years ago`;
    }

    
    /**
     * get total months between two dates
     */
    const months = Math.floor(difference / (86400 * 30));
    if (months >= 1) {
        return `${months} months ago`;
    }
    
    /**
     * get total weeks between two dates
     */
    const weeks = Math.floor(difference / (86400 * 7));
    if (weeks >= 1) {
        return `${weeks} weeks ago`;
    }
    
    /**
     * get total days between two dates
     */
    const days = Math.floor(difference / 86400);
    if (days >= 1) {
        return `${days} days ago`;
    }

    /**
     * get hours        
     */
    const hours = Math.floor(difference / 3600) % 24;
    if (hours >= 1) {
        return `${hours} hours ago`;
    }
    
    /**
     * get minutes
     */
    const minutes = Math.floor(difference / 60) % 60;
    if (minutes >= 1) {
        return `${minutes} minutes ago`;
    }

    /**
     * get seconds
     */
    const seconds = difference % 60;
    if (seconds >= 1) {
        return `${seconds} seconds ago`;
    }
}

export {
    getDomainFromUrl,
    getTimeDuration,
    setNewsAsHidden,
    getHiddenNews
}