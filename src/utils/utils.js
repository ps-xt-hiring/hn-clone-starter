/**
 * For getting hostname from a url
 * @param {*} url 
 */
const getHostUrl = url => {
    var parser = document.createElement('a');
    parser.href = url;

    return parser.hostname;
}

/**
 * Converting the timestamp in to proper 'ago' format
 * @param {*} diff 
 */
const getDateDiff = diff => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    if (diff < msPerMinute) {
         return Math.round(diff/1000) + ' seconds ago';   
    }
    else if (diff < msPerHour) {
         return Math.round(diff/msPerMinute) + ' minutes ago';   
    }
    else if (diff < msPerDay ) {
         return Math.round(diff/msPerHour ) + ' hours ago';   
    }
    else if (diff < msPerMonth) {
        return Math.round(diff/msPerDay) + ' days ago';   
    }
    else if (diff < msPerYear) {
        return Math.round(diff/msPerMonth) + ' months ago';   
    }
    else {
        return Math.round(diff/msPerYear) + ' years ago';   
    }
}

/**
 * Changing the color style based on input
 * @param {*} number 
 */
const getColorByRange = number => {
    if (number > 50 && number <= 100) return 'count-type-1';
    else if (number > 100) return 'count-type-2';
}

export default {
    getHostUrl,
    getDateDiff,
    getColorByRange
};