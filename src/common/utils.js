// eslint-disable-next-line import/no-unresolved
import { formatDistance, subDays } from 'date-fns';

export const toBaseURL = fullURL => fullURL && fullURL.replace(/(http(s)?:\/\/(www\.)?)|(\/.*){1}/g, '');

export const getFormattedDate = date => formatDistance(subDays(new Date(date), 0), new Date());
