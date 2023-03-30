export const initialState = {
  // Активное сообщение
  message: {
    type: 0,
    text: 'Требуется обновление курсов',
  },
  // Время и дата обновления данных курсов
  // таймштамп или null
  updated: null,
  // Блоки конвертации валюты
  currencyBlocks: [
    { value: 0, currency: 'USD' },
    { value: 0, currency: 'EUR' },
  ],
  // Объект с обменными курсами валют,
  // запрашивается с сервера
  rates: {},
};

export const messages = {
  loading: 0,
  error: 1,
  ready: 2,
};
