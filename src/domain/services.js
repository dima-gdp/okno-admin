import { getFormattedLocalePrice } from '@/utils'

export const SERVICES_HEADERS = [
  {
    title: 'Id',
    align: 'start',
    sortable: false,
    key: 'id',
    width: 100
  },
  {
    title: 'Статус',
    align: 'start',
    sortable: false,
    key: 'status',
    width: 100
  },
  {
    title: 'Сорт.',
    key: 'sort',
    sortable: false,
    align: 'start',
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

/**
 * Возвращает форматированные услуги
 * @param {Service[]} services
 * @returns array
 */
export function getFormattedServices(services) {
  if (services) {
    return services.map((service) => ({
      description: service?.description,
      id: service?.id,
      name: service?.name,
      sort: service?.sort,
      is_active: service?.is_active,
      cost: getFormattedLocalePrice({ price: Number(service.cost) })
    }))
  }
  return []
}
