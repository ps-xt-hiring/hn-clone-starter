import { formatDistance, subDays } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const toBaseURL = fullURL => fullURL && fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');

export const getFormattedDate = date => formatDistance(subDays(new Date(date), 0), new Date());
