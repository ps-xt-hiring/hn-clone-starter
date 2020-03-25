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
export const convertToTimesAgo = (timestr) => {
    if (!timestr) return null;

    var seconds = Math.floor((new Date() - new Date(timestr)) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
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
