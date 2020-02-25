import {labelConstants} from "../static/constants";

function stalenessOfNews(news){
    let date = new Date();
    let createdAt = new Date(news.created_at);
    let timeDiff = date.getTime() - createdAt.getTime();
    let seconds,
      minutes,
      hours,
      days = 0;
    seconds = Math.ceil(timeDiff / 1000);
    if (seconds > 60) minutes = Math.ceil(seconds / 60);
    if (minutes > 60) hours = Math.ceil(minutes / 60);
    if (hours > 24) days = Math.ceil(hours / 24);
    return (
      (days && days + " "+labelConstants.DAYS+" "+labelConstants.AGO) ||
      (hours && hours + " "+labelConstants.HOURS+" "+labelConstants.AGO) ||
      (minutes && minutes + " "+labelConstants.MINUTES+" "+labelConstants.AGO) ||
      (seconds && seconds + " "+labelConstants.SECONDS+" "+labelConstants.AGO)
    );
  };

  export {
      stalenessOfNews
    };