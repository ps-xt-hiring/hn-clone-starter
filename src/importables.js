export const dateAndTime = (dateString) => {
    const diff = Date.now() - Date.parse(dateString);
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = months / 12;

    if (seconds < 60) {
        return `${Math.ceil(seconds)} secondsonds ago`;
    }
    if (minutes < 60) {
        return `${Math.ceil(minutes)} minutesutes ago`;
    }
    if (hours < 24) {
        return `${Math.ceil(hours)} hours ago`;
    }
    if (days < 30) {
        return `${Math.ceil(days)} days ago`;
    }
    if (months < 12) {
        return `${Math.ceil(months)} months ago`;
    }
    return `${Math.ceil(years)} years ago`;
};

export const getQueryStringValue = (key) => {
    if (window && window.location && window.location.search) {
        const regex = new RegExp(`^(?:.*[&\\?]${encodeURIComponent(key).replace(/[.+*]/g, '\\$&')}(?:\\=([^&]*))?)?.*$`, 'i');
        return decodeURIComponent(window.location.search.replace(regex, '$1'));
    }
    return null;
};

export const obj = {
HIDE : 'hide',
BY : 'by',
DATA_LOAD : 'please wait...',
TOP : 'top',
NEW : 'new',
MORE : 'More',
}