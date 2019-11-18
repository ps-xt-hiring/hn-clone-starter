// HACKER NEWS UTITLITY FUNCTIONS
export function getUrl(string) {
  let strUrl = string;
  if (strUrl) {
    strUrl = strUrl.split('/');
    return strUrl[2];
  }
  return '"NA"';
}

// ADDING https:// and REMOVING PARENTHESIS from stringUrl
export function redirectUrl(strUrl) {
  let redirecUrl;
  if (strUrl) {
    redirecUrl = `https://${strUrl}`;
    return redirecUrl;
  }
  return 'NA';
}

export const timeConversion = (time) => {
    const newDate = new Date(time);
    const todaysDate = new Date();
  
    const diffTime = Math.abs(todaysDate - newDate);
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffSeconds < 60) {
      if (diffSeconds <= 1) {
        return ` ${diffMinutes} second `;
      }
      return ` ${diffMinutes} seconds `;
    }
    if (diffMinutes < 60) {
      if (diffMinutes <= 1) {
        return ` ${diffMinutes} minute `;
      }
      return ` ${diffMinutes} minutes `;
    }
    if (diffHours < 24) {
      if (diffHours <= 1) {
        return ` ${diffHours} hour `;
      }
      return ` ${diffHours} hours `;
    }
  
    if (diffDays <= 1) {
      return ` ${diffDays} day `;
    }
    return ` ${diffDays} days `;
  }; 

// FETCH STORIES
export const fetchStories = async (page) => {
  let response, more='';
  try {
    response = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`,
    );

    const data = await response.json();
    let pageNumber = page + 1;

    if (!data.hits.length) {
      pageNumber = 0;
      more = 'Go Back';
    }

    return {
      stories: data.hits,
      loading: false,
      page: pageNumber,
      more, 
    };
  } catch (err) {
    console.log(err); // TypeError: failed to fetch
  }

};

