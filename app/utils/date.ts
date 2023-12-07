import { isSameDay } from 'date-fns'

export const isDateInArray = (date: Date, dateArray: Date[]) => {
  return dateArray.some((singleDate) => isSameDay(singleDate, date))
}
