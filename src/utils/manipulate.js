const fetchDomainName = (str) => {
    let domain;
    if(str && str !== null) {
        domain = str.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    }
    return domain;
};

export default fetchDomainName;