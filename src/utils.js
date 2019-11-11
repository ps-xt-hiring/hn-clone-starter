export const toBaseURL = fullURL => fullURL
    && fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '').replace('www.', '');
export const convertMS = (milliseconds) => {
  let hour; let minute; let
    seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds %= 60;
  hour = Math.floor(minute / 60);
  minute %= 60;
  const day = Math.floor(hour / 24);
  hour %= 24;
  const res = day >= 1 ? `${day}days` : `${hour}hours`;
  return res;
};
