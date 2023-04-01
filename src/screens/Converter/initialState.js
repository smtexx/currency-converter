export const messages = {
  loading: 0,
  error: 1,
  ready: 2,
};

export const initialState = {
  // Блоки конвертации валюты
  currencyBlocks: [
    { value: 0, currency: 'USD' },
    { value: 0, currency: 'EUR' },
  ],
  // Время и дата обновления данных курсов
  // таймштамп или null
  updated: null,
  // Активное сообщение
  message: {
    type: messages.loading,
    text: 'Требуется обновление курсов',
  },
  // Объект с обменными курсами валют,
  // запрашивается с сервера
  rates: {},
};
