export function extractHostname(url) {
  if (url) {
    let hostname;
    if (url.indexOf('//') > -1) {
      [,, hostname] = url.split('/');
    } else {
      [hostname] = url.split('/');
    }
    [hostname] = hostname.split(':');
    [hostname] = hostname.split('?');
    return hostname;
  }
  return url;
}

export function timeDifference(datetime) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = Date.parse(new Date()) - Date.parse(datetime);

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  } if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  } if (elapsed < msPerMonth) {
    return `approximately ${Math.round(elapsed / msPerDay)} days ago`;
  } if (elapsed < msPerYear) {
    return `approximately ${Math.round(elapsed / msPerMonth)} months ago`;
  }
  return `approximately ${Math.round(elapsed / msPerYear)} years ago`;
}
