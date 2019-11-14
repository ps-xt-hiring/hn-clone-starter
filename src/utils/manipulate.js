const getDomain = url => {
  return url !== null ? url.split("/")[2] : "";
};

export default getDomain;
