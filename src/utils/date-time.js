import { DateTime } from 'luxon'
import { DEFAULT_DATE_FORMAT } from '@/utils/constants'

export function fromISOToString(iso, format = DEFAULT_DATE_FORMAT) {
  return DateTime.fromISO(iso).toFormat(format)
}
