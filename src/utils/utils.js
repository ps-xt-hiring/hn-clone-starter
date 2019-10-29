/**
 * For getting hostname from a url
 * @param {*} url
 */
const getHostUrl = (url) => {
  const parser = document.createElement('a');
  parser.href = url;

  return parser.hostname;
};

/**
 * Converting the timestamp in to proper 'ago' format
 * @param {*} diff
 */
const getDateDiff = (diff) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (diff < msPerMinute) {
    return `${Math.round(diff / 1000)} seconds ago`;
  }
  if (diff < msPerHour) {
    return `${Math.round(diff / msPerMinute)} minutes ago`;
  }
  if (diff < msPerDay) {
    return `${Math.round(diff / msPerHour)} hours ago`;
  }
  if (diff < msPerMonth) {
    return `${Math.round(diff / msPerDay)} days ago`;
  }
  if (diff < msPerYear) {
    return `${Math.round(diff / msPerMonth)} months ago`;
  }
  return `${Math.round(diff / msPerYear)} years ago`;
};

/**
 * Changing the color style based on input
 * @param {*} number
 */
const getColorByRange = (number) => {
  if (number > 50 && number <= 100) return 'count-type-1';
  return 'count-type-2';
};

export default {
  getHostUrl,
  getDateDiff,
  getColorByRange,
};
