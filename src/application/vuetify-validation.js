export function requiredRule(value) {
  if (value) return true
  return 'Поле обязательно'
}

export function integerRule(value) {
  if (Number.isInteger(Number(value))) return true
  return 'Поле должно состоять из чисел'
}

export function emailRule(value) {
  if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(value)) return true
  return 'Введите корректный email'
}
