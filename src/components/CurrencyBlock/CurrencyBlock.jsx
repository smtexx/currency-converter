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
  listId,
}) {
  // Обработчик изменения количества валюты
  function handleValueChange(e) {
    dispatch({
      type: actions.changeValue,
      payload: {
        value: e.target.value,
        index,
      },
    });
  }

  // Обработчик изменения кода валюты
  function handleCurrencyChange(e) {
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
            onChange={handleValueChange}
          />
        </div>
        <CurrencyInput
          listId={listId}
          currency={currency}
          onChange={handleCurrencyChange}
        />
      </div>
    </div>
  );
}
