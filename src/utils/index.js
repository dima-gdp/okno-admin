/**
 * Форматирует цену
 * @param {Object} priceNumber
 * @param {number} priceNumber.price - цена
 * @param {string} [priceNumber.locale='ru-RU'] - локаль
 * @param {string} [priceNumber.currency='₽'] - валюта
 * @returns {string}
 */
export function getFormattedLocalePrice({ price, locale = 'ru-RU', currency = '₽' }) {
    const priceString = price.toLocaleString(locale)
    return `${priceString} ${currency}`
}
