const findDomain = (url) => {
  const urlParts = url && url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]; 
  return urlParts;
};
export default findDomain;
