const getDomain = url => {
  return url && url !== null ? url.split("/")[2] : "";
};

export default getDomain;
