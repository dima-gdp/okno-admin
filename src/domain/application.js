import { fromISOToString } from '@/utils/date-time'

/**
 * Возвращает форматированную заявку
 * @param {application} application
 * @returns Object
 */
export function formattedApplications(application) {
  return {
    ...application,
    created_at: fromISOToString(application.created_at)
  }
}
