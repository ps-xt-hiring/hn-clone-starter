import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const helpers = {
  getDomainByUrl: url => url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0],
  getDateFormate: date => formatDistance(subDays(new Date(date), 0), new Date())
}

export default helpers;
