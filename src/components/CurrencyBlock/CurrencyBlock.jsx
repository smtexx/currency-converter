import { currencyNames } from '../../data/currencyNames';
import { setClass } from '../../lib/helpers';
import { actions } from '../../screens/Converter/reducer';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import s from './CurrencyBlock.module.scss';

export default function CurrencyBlock({
  value,
  currency,
  index,
  dispatch,
  rates,
  listId,
}) {
  // Уникальный идентификатор для привязки опций с
  // кодами валют к input
  const uniqID = `CurrencyBlock-${index}`;

  // Обработчик изменения количества валюты
  function handleValueInput(e) {
    dispatch({
      type: actions.changeValue,
      payload: {
        value: e.target.value,
        index,
      },
    });
  }

  // Обработчик изменения кода валюты
  function handleCurrencyInput(e) {
    dispatch({
      type: actions.changeCurrency,
      payload: {
        currency: e.target.value,
        index,
      },
    });
  }

  return (
    <div className={setClass([[s.wrapper], ['cm-block']])}>
      <p className={s.name}>
        {currencyNames[currency] || 'Неизвесная валюта'}
      </p>
      <div className={s.controls}>
        <div className={s.valueWrapper}>
          <input
            type="number"
            className="cm-field"
            value={value.toString()}
            onInput={handleValueInput}
          />
        </div>
        <CurrencyInput
          listId={listId}
          currency={currency}
          handleCurrencyInput={handleCurrencyInput}
        />
      </div>
    </div>
  );
}
