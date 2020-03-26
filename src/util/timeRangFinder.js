/* eslint-disable */
const formTimeText = inputTimeObj => {
  // eslint-disable-next-line
  const { isInSeconds, isInMintues, isInHours, isInDays } = inputTimeObj;
  const setText = inputTime => txt => `${inputTime} ${txt} ago`;

  let labelTxt = '';

  if (isInSeconds) labelTxt = setText(isInSeconds)('seconds');

  // eslint-disable-next-line
  if (isInMintues)
    labelTxt = setText(isInMintues)(isInMintues === 1 ? 'minunte' : 'minutes'); // eslint-disable-line

  // eslint-disable-next-line
  if (isInHours)
    labelTxt = setText(isInHours)(isInHours === 1 ? 'hours' : 'hours'); // eslint-disable-line

  if (isInDays) labelTxt = setText(isInDays)(isInDays === 1 ? 'day' : 'days');

  return labelTxt;
};

// eslint-disable-next-line
const findRange = dateTime => {
  const tTime = new Date(dateTime);
  const cTime = new Date();
  const min = Math.round((cTime - tTime) / 60000);

  return {
    isInSeconds: min === 0 ? Math.round((cTime - tTime) / 1000) : false,
    isInMintues: min < 60 ? min : false,
    isInHours: min > 59 && min < 1440 ? Math.round(min / 60) : false,
    isInDays: min > 1439 ? Math.round(min / 1440) : false // eslint-disable-line
  };
};

/**
 * To find Post time since it posed
 *
 * @export
 * @param {Date String} inputTime
 * @returns {any} {dateTimeAttr : Date String, label: string}
 */
// eslint-disable-next-line
export function timeRange(inputTime) {
  if (!inputTime) return {};

  const timeObj = findRange(inputTime);

  return {
    dateTimeAttr: inputTime,
    label: formTimeText(timeObj) // eslint-disable-line
  };
}
