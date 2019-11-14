import { formatDistance, subDays } from 'date-fns';

export const rootUrl = (url = '') => {

    var urlPath = url && url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

    return urlPath;

}

export const daysAgo = (date = "12-01-2019") => {

    return formatDistance(subDays(new Date(date), 0), new Date());
}