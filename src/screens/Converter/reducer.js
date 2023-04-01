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
  const { type, payload } = action;

  // Сохранить загруженные с сервера значения курсов валют
  // payload: {rates: object, updated: number}
  if (type === actions.updateRates) {
    newState.rates = payload.rates;
    newState.updated = payload.updated;
    newState.message = {
      type: messages.ready,
      text: null,
    };
  }

  // Изменить текущее сообщение
  // payload: {type: number, text: string}
  else if (type === actions.changeMessage) {
    newState.message = {
      type: payload.type,
      rext: payload.text,
    };
  }

  // Пересчитать значения валют при изменении валюты блока
  // payload: {currency: string, index: number}
  else if (type === actions.changeCurrency) {
    // Изменить значение внутри блока с индексом index
    const { currency, index } = payload;
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
  }

  // Пересчитать значения при изменении количества валюты блока
  // payload: {value: string, index: number}
  else if (type === actions.changeValue) {
    // Обработать полученное значение
    const value =
      payload.value === ''
        ? 0
        : Math.floor(parseFloat(payload.value) * 100) / 100;

    // Если введенное значение валидно,
    // изменить значение и пересчитать соседние блоки
    if (!Number.isNaN(value)) {
      newState.currencyBlocks[payload.index].value = value;
      newState.currencyBlocks = recalculateCurrencyBlocks(
        payload.index,
        newState.currencyBlocks,
        newState.rates
      );
    }
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
