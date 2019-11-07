const getDomain = (url) => {
  if (url) {
    const urlName = new URL(url);
    return urlName.host;
  }
  return 'Unknown';
};

const getColor = (comments) => {
  switch (true) {
    case comments < 500:
      return 'burntOrange';
    case comments >= 500 && comments < 1000:
      return 'grey';
    case comments >= 1000:
      return 'radicalRed';
    default:
      return 'grey';
  }
};

export { getDomain, getColor };
