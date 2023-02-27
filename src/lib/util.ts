import { format } from 'date-fns'

export const getDate = (date: string | undefined) => {
  if (!date) return ''
  return format(Date.parse(date), 'yyyy/MM/dd')
}
