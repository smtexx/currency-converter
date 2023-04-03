import { setClass } from '../../lib/helpers';
import { FiPlusCircle } from 'react-icons/fi';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import s from './AddRate.module.scss';
import { useRef, useState } from 'react';
import { actions } from '../../screens/Converter/reducer';

export default function AddRate({ dispatch, listId }) {
  const [from, setFrom] = useState('EUR');
  const [to, setTo] = useState('RSD');
  const valueRef = useRef(null);

  function handleChangeFrom(e) {
    setFrom(e.target.value);
  }
  function handleChangeTo(e) {
    setTo(e.target.value);
  }
  function handleAddRate() {
    dispatch({
      type: actions.addUserRate,
      payload: {
        value: valueRef.current.value,
        from,
        to,
      },
    });
    valueRef.current.value = '';
  }

  return (
    <section className={setClass([[s.wrapper], ['cm-block']])}>
      <header className={s.header}>
        <span className={s.icon}>
          <FiPlusCircle />
        </span>
        <h2 className={s.title}>Добавить свой курс</h2>
      </header>

      <div className={s.controls}>
        <label className={s.label}>
          Начальная валюта:{' '}
          <CurrencyInput
            currency={from}
            onChange={handleChangeFrom}
            listId={listId}
          />
        </label>
        <label className={s.label}>
          Конечная валюта:{' '}
          <CurrencyInput
            currency={to}
            onChange={handleChangeTo}
            listId={listId}
          />
        </label>
        <label className={s.label}>
          По курсу:{' '}
          <input
            type="number"
            className="cm-field"
            placeholder="0"
            ref={valueRef}
          />
        </label>
        <button
          className={setClass([[s.addButton], ['cm-field']])}
          onClick={handleAddRate}
        >
          Добавить
        </button>
      </div>
    </section>
  );
}
