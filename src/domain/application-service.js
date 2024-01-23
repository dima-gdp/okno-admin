import { getFormattedLocalePrice } from '@/utils'

export const APPLICATION_SERVICE_HEADERS = [
  {
    title: 'Статус',
    align: 'start',
    sortable: false,
    key: 'status',
    width: 100
  },
  {
    title: 'Наименование',
    key: 'name',
    sortable: false,
    align: 'start'
  },
  {
    title: 'Описание',
    key: 'description',
    sortable: false,
    align: 'start'
  },
  {
    title: 'Стоимость',
    key: 'cost',
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

const REQUIRED_APPLICATION_SERVICE_ID = [1, 2, 3]

/**
 * Возвращает статус обязательности услуги
 * @param {Object} service
 * @returns boolean
 */
function isDisableService(service) {
  return REQUIRED_APPLICATION_SERVICE_ID.includes(Number(service.id))
}

/**
 * Возвращает форматированные услуги заявки
 * @param {applicationService[]} applicationServices
 * @returns array
 */
export function getFormattedApplicationServices(applicationServices) {
  if (applicationServices) {
    return applicationServices.map((service) => ({
      description: service.description,
      id: service.id,
      sort: service.sort,
      name: service.name,
      disable_service: isDisableService(service),
      is_active: service.is_selected,
      cost: getFormattedLocalePrice({ price: Number(service.cost) })
    }))
  }
  return []
}
