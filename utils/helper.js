import moment from 'moment';

export const parseDomainFromUrl = (url) => {
    if (!url) return '';
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }
};
export const convertToTimesAgo = (timeStr) => {
    if (!timeStr) return null;
    return moment(timeStr).fromNow();
}
export const storeActivity = (activityName, key, value) => {
    if (typeof localStorage === 'undefined') return {};
    let activity = getActivity(activityName);
    activity[key] = value;
    localStorage.setItem(activityName, JSON.stringify(activity));
}
export const getActivity = (activityName) => {
    if (typeof localStorage === 'undefined') return {};
    let activity = localStorage.getItem(activityName);
    if (activity) {
        activity = JSON.parse(activity);
    } else {
        activity = {};
    }
    return activity;
}
export const getNewState = (news, objectID, itemIndex, storageKey) => {
    storeActivity(storageKey, objectID, 1);
    let newsObj = Object.assign({}, news);
    newsObj.hits[itemIndex][storageKey] = 1;
    return newsObj;
}
