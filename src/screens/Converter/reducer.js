import { createStateCopy } from '../../lib/helpers';
import { messages } from './initialState';

// Доступные действия
export const actions = {
  updateRates: 'updateRates',
  changeMessage: 'changeMessage',
  changeCurrency: 'changeCurrency',
  changeValue: 'changeValue',
  addUserRate: 'addUserRate',
  deleteUserRate: 'deleteUserRate',
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
        newState.rates,
        newState.userRates
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
        newState.rates,
        newState.userRates
      );
    }
  }

  // Добавить пользовательский курс валюты
  // payload: {from: string, to: string, value: string}
  else if (type === actions.addUserRate) {
    const { from, to, value: rawValue } = payload;
    const parsedValue = parseFloat(rawValue);
    if (
      from in newState.rates &&
      to in newState.rates &&
      !Number.isNaN(parsedValue)
    ) {
      const value = Math.round(parsedValue * 100) / 100;
      if (from in newState.userRates) {
        newState.userRates[from][to] = value;
      } else {
        newState.userRates[from] = {
          [to]: value,
        };
      }
    }
  }

  // Удалить пользовательский курс валюты
  // payload: {from: string, to: string}
  else if (type === actions.deleteUserRate) {
    const { from, to } = payload;
    if (
      from in newState.userRates &&
      to in newState.userRates[from]
    ) {
      delete newState.userRates[from][to];
    }
  }

  return newState;
}

// Функция для пересчета соседних блоков конвертации
function recalculateCurrencyBlocks(
  index,
  blockArray,
  rates,
  userRates
) {
  // Получить значения из базового блока
  const baseCurrency = blockArray[index].currency;
  const baseValue = blockArray[index].value;

  // Запустить перерасчет и вернуть массив с результатами
  return blockArray.map((currentBlock, currentBlockIndex) => {
    // Базовый блок не пересчитывается
    if (currentBlockIndex === index) {
      return currentBlock;
    }

    const currentCurrency = currentBlock.currency;
    let calculatedValue;

    // Проверить наличие ПРЯМОЙ котировки в пользовательских курсах
    const directUserRate =
      userRates?.[baseCurrency]?.[currentCurrency];
    // Проверить наличие ОБРАТНОЙ котировки в пользовательских курсах
    const inverseUserRate =
      userRates?.[currentCurrency]?.[baseCurrency];

    if (directUserRate) {
      // При наличии прямой котировки
      calculatedValue = baseValue * directUserRate;
    } else if (inverseUserRate) {
      // При наличии обратной котировки
      calculatedValue = baseValue / inverseUserRate;
    } else if (!calculatedValue) {
      // Выполнить пересчет без учета пользовательских курсов
      const baseRate = rates[baseCurrency];
      const currentRate = rates[currentCurrency];
      calculatedValue = (baseValue * currentRate) / baseRate;
    }

    return {
      value: Math.floor(calculatedValue * 100) / 100,
      currency: currentCurrency,
    };
  });
}
