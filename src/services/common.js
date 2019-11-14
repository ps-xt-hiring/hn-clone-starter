// Function name: updateLocalStorage
// Arguments: lsName (Local storage name) | newValue (Value to be pushed in local storage)
// It updates the current/new local storage item by pushing the new value provided
export function updateLocalStorage(lsName, newValue) {
  if (localStorage.getItem(lsName) === null) {
    localStorage.setItem(lsName, JSON.stringify([]));
  }

  const lsData = JSON.parse(localStorage.getItem(lsName));
  lsData.push(newValue);
  localStorage.setItem(lsName, JSON.stringify(lsData));
}

// Function name: formatDate
// Arguments: date (Post date stamp)
// It takes the date stamp of item and formats it in accordance with the current time
// Output example: (3 hours ago)
export function formatDate(date) {
  const itemDate = new Date(date);
  const seconds = Math.floor((new Date() - itemDate) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

// Function name: getDomainName
// Arguments: url (Post Url)
// It extracts the domain.com from the provide url
export function getDomainName(url) {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  let domainName;

  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    [, , domainName] = match;
  } else {
    domainName = null;
  }

  return domainName;
}
