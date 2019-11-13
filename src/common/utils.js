import {formatDistance, subDays} from 'date-fns';

export const rootUrl = (url = '') => {
    console.log("URL", url);
    var r = /:\/\/(.[^/]+)/;
    return url && url.match(r)[1];
}

export const daysAgo = (date="12-01-2019") => {
    console.log("Date recd", date);
    return formatDistance(subDays(new Date(date), 0), new Date());
}