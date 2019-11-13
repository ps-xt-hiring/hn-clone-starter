import getDuration from 'moment';

const fetchDomainName = (str) => {
    let domain;
    if(str && str !== null) {
        /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
        domain = str.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    }
    return domain;
};

const getTimeDuration = (date) => {
    let inputDate = new Date(date);
    let time = getDuration(inputDate);

    return time;
};

export {
    fetchDomainName,
    getTimeDuration,
};