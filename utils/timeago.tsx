import { formatDistanceToNow, parseISO } from 'date-fns'
import moment from 'moment'

export const timeago = (time: any) => {
  console.log('🚀 ~ file: timeago.tsx:5 ~ timeago ~ time', time)
  try {
    //return formatDistanceToNow(parseISO(time), { addSuffix: true })
    return moment(new Date(time)).fromNow()
  } catch (error) {
    return 'a while ago'
  }
}
