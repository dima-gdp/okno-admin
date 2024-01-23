import {fromISOToString} from "@/utils/date-time";

export const APPLICATIONS_HEADER = [
  {
    title: '№ заявки',
    align: 'start',
    sortable: false,
    key: 'id',
    width: 150
  },
  {
    title: 'Дата создания',
    key: 'date',
    sortable: false,
    align: 'start'
  },
  {
    title: 'Телефон заявителя',
    key: 'phone',
    sortable: false,
    align: 'start'
  },
  {
    title: 'E-mail заявителя',
    key: 'email',
    sortable: false,
    align: 'start'
  },
  {
    title: 'ИНН организации',
    key: 'inn',
    sortable: false,
    align: 'start'
  },
  {
    title: 'Статус заявки',
    key: 'status',
    sortable: false,
    align: 'start'
  },
  {
    title: '',
    key: 'action',
    sortable: false,
    align: 'start',
    width: 100
  }
]

export const APPLICATIONS_STATUSES = [
  { value: 'NEW', label: 'Новая', style: 'color: green' },
  { value: 'PROCESSING', label: 'В работе', style: '' },
  { value: 'CLOSED', label: 'Закрыта', style: '' },
  { value: 'REJECTED', label: 'Отклонена', style: '' }
]

/**
 * Возвращает объект статуса заявки
 * @param {string} applicationStatus
 * @returns Object
 */
function getApplicationStatus(applicationStatus) {
  const statusApplication = APPLICATIONS_STATUSES.find(
    (status) => status.value.toLowerCase() === applicationStatus.toLowerCase()
  )
  return statusApplication
}

/**
 * Возвращает форматированные заявки
 * @param {applications[]} applications
 * @returns array
 */
export function formattedApplications(applications) {
  if (applications) {
    return applications.map((application) => ({
      id: application.id,
      status: getApplicationStatus(application.status),
      date: fromISOToString(application?.created_at),
      inn: application.inn,
      phone: application.phone,
      email: application.email,
      fio: application.fio,
      comment: application.comment,
      service_cost: application.service_cost
    }))
  }
  return []
}
