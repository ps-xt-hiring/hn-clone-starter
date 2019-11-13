export const findDomain = url => {
  let urlParts = url && url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];;
  return urlParts;
};
