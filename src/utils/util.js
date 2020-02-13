export const getHostName = (url) => {
    const pathArray = url && url.split( '/' );
    return pathArray && pathArray.length ? pathArray[2] : "";
}

export const timeAgo = (ms) => {
  var ago = Math.floor(ms / 1000);
  var part = 0;

  if (ago < 2) { return "a moment ago"; }
  if (ago < 5) { return "moments ago"; }
  if (ago < 60) { return ago + " seconds ago"; }

  if (ago < 120) { return "a minute ago"; }
  if (ago < 3600) {
    while (ago >= 60) { ago -= 60; part += 1; }
    return part + " minutes ago";
  }

  if (ago < 7200) { return "an hour ago"; }
  if (ago < 86400) {
    while (ago >= 3600) { ago -= 3600; part += 1; }
    return part + " hours ago";
  }

  if (ago < 172800) { return "a day ago"; }
  if (ago < 604800) {
    while (ago >= 172800) { ago -= 172800; part += 1; }
    return part + " days ago";
  }

  if (ago < 1209600) { return "a week ago"; }
  if (ago < 2592000) {
    while (ago >= 604800) { ago -= 604800; part += 1; }
    return part + " weeks ago";
  }

  if (ago < 5184000) { return "a month ago"; }
  if (ago < 31536000) {
    while (ago >= 2592000) { ago -= 2592000; part += 1; }
    return part + " months ago";
  }

  if (ago < 1419120000) { // 45 years, approximately the epoch
    return "more than year ago";
  }

  // TODO pass in Date.now() and ms to check for 0 as never
  return "never";
}

export const setLocalStorage = (storageName, id, value) => {
    const itemValue = localStorage.getItem(storageName);
    const itemValueObject = itemValue ? JSON.parse(itemValue) : {};

    itemValueObject[id] = value;

    localStorage.setItem(storageName, JSON.stringify(itemValueObject));
}

export const getLocalStorage = (storageName) => {
    const itemValue = localStorage.getItem(storageName);
    const itemValueObject = itemValue ? JSON.parse(itemValue) : {};
    return itemValueObject;
}
