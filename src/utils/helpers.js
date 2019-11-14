

export const getHostname = url => url && url.split('/')[2];

export const getPostedTimeString = (postedDateTime) => {
  if (!postedDateTime) {
    return '';
  }

  const postedDateTimeObj = new Date(postedDateTime);
  const postedDate = postedDateTimeObj.getDate();
  const postedMonth = postedDateTimeObj.getMonth() + 1;
  const popstedYear = postedDateTimeObj.getFullYear();
  const postedMinutes = postedDateTimeObj.getMinutes();
  const postedHours = postedDateTimeObj.getHours();

  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const crrentYear = date.getFullYear();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();

  if ((crrentYear - popstedYear) > 0) {
    return `${crrentYear - popstedYear} years ago`;
  } if ((currentMonth - postedMonth) > 0) {
    return `${currentMonth - postedMonth} months ago`;
  } if ((currentDate - postedDate) > 0) {
    return `${currentDate - postedDate} days ago`;
  } if ((currentHours - postedHours) > 0) {
    return `${currentHours - postedHours} hours ago`;
  } if (currentMinutes - postedMinutes > 0) {
    return `${currentMinutes - postedMinutes} minutes ago`;
  }
  return '0 minutes ago';
};
