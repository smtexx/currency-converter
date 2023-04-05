import { currencyNames } from '../../data/currencyNames';
import { setClass } from '../../lib/helpers';
import { actions } from '../../screens/Converter/reducer';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import ReferenceButton from '../ReferenceButton/ReferenceButton';
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
      <ReferenceButton
        dispatch={dispatch}
        text={`Здесь вы можете изменять количество валюты и саму валюту блока.
          В качестве разделителя целой и дробной частей используйте запятую
          а не точку! Для отображения валют используется их международный
          трехзначный код. 
          Имейте ввиду, что при изменении количества валюты - происходит
          перерасчет по курсу количества валюты соседних блоков. При изменении же 
          валюты блока, перерасчет количества валюты производится только в 
          текущем блоке. Вы можете изменять любой из блоков в произвольном
          порядке.`}
      />
    </div>
  );
}
