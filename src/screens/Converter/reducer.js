import { createStateCopy } from '../../lib/helpers';
import { messages } from './initialState';

// Доступные действия
export const actions = {
  updateRates: 'updateRates',
  changeMessage: 'changeMessage',
  changeCurrency: 'changeCurrency',
  changeValue: 'changeValue',
};

export function reducer(state, action) {
  const newState = createStateCopy(state);

  // eslint-disable-next-line default-case
  switch (action.type) {
    // Сохранить загруженные с сервера значения курсов валют
    // payload: {rates: object, updated: number}
    case actions.updateRates:
      newState.rates = action.payload.rates;
      newState.updated = action.payload.updated;
      newState.message = {
        type: messages.ready,
        text: null,
      };
      break;

    // Изменить текущее сообщение
    // payload: {type: number, text: string}
    case actions.changeMessage:
      newState.message = action.payload;
      break;

    // Пересчитать значения валют при изменении валюты блока
    // payload: {currency: string, index: number}
    case actions.changeCurrency:
      // Изменить значение внутри блока с индексом index
      const { currency, index } = action.payload;
      newState.currencyBlocks[index].currency = currency;

      // Если значение валидное, выполнить пересчет
      // соседних блоков
      if (currency in newState.rates) {
        newState.currencyBlocks = recalculateCurrencyBlocks(
          index,
          newState.currencyBlocks,
          newState.rates
        );
      }
      break;

    // Пересчитать значения при изменении количества валюты блока
    // payload: {value: string, index: number}
    case actions.changeValue:
      // Обработать полученное значение
      const rawValue = action.payload.value;
      const value =
        rawValue === ''
          ? 0
          : Math.floor(parseFloat(rawValue) * 100) / 100;

      // Если введенное значение валидно,
      // изменить значение и пересчитать соседние блоки
      if (!Number.isNaN(value)) {
        const index = action.payload.index;
        newState.currencyBlocks[index].value = value;
        newState.currencyBlocks = recalculateCurrencyBlocks(
          index,
          newState.currencyBlocks,
          newState.rates
        );
      }
      break;
  }

  return newState;
}

// Функция для пересчета соседних блоков конвертации
function recalculateCurrencyBlocks(index, blockArray, rates) {
  // Получить значение и курс из базового блока
  const baseValue = blockArray[index].value;
  const baseRate = rates[blockArray[index].currency];

  // Пересчитать значения соседних блоков
  return blockArray.map((block, blockIndex) => {
    // Если это базовый блок, пересчет не выполняется
    if (index === blockIndex) {
      return block;
    }

    // Получить значение и курс текущего блока
    const blockRate = rates[block.currency];
    // Рассчитать новое значение, округлив до сотых
    const blockValue =
      Math.round(((blockRate * baseValue) / baseRate) * 100) / 100;

    return {
      value: blockValue,
      currency: block.currency,
    };
  });
}
