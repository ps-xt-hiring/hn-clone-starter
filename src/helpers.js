// HACKER NEWS UTITLITY FUNCTIONS
export function getUrl(string) {
  let strUrl = string;
  if (strUrl) {
    strUrl = strUrl.split("/");
    return strUrl[2];
  }
  return `"NA"`;
}

// ADDING https:// and REMOVING PARENTHESIS from stringUrl
export function redirectUrl(strUrl) {
  let redirecUrl;
  if (strUrl) {
    redirecUrl = `https://${strUrl}`;
    return redirecUrl;
  }
  return "NA";
}
