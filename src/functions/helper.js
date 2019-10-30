const getDomain = (url) => {
  if (url) {
    const urlName = new URL(url);
    return  urlName.host 
  } else {
    return "Unknown"
  }
}

const getColor = (comments) => {
	if( comments < 500 ) {
		return "burntOrange"
	}
	else if (comments >= 500 && comments < 1000) {
  	return "grey"
	} else if (comments >= 1000 ) {
		return "radicalRed"
	}
}

export {
  getDomain,
  getColor
};