import { currencyNames } from '../../data/currencyNames';
import { actions } from '../../screens/Converter/reducer';
import s from './CurrencyBlock.module.scss';

export default function CurrencyBlock({
  value,
  currency,
  index,
  dispatch,
  rates,
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
    <div className={s.wrapper}>
      <p className={s.name}>
        {currencyNames[currency] || 'Неизвесная валюта'}
      </p>
      <div className={s.controls}>
        <div className={s.valueWrapper}>
          <input
            type="number"
            className={s.field}
            value={value.toString()}
            onInput={handleValueInput}
          />
        </div>
        <input
          type="text"
          list={uniqID}
          size={4}
          className={s.field}
          value={currency}
          onInput={handleCurrencyInput}
        />
        <datalist id={uniqID}>
          {Object.keys(rates).map((code) => (
            <option value={code} key={code} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
