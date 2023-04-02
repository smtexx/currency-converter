import { setClass } from '../../lib/helpers';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import { FiPlusCircle } from 'react-icons/fi';
import s from './UserCurrency.module.scss';

export default function UserCurrency() {
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
          Начальная валюта: <CurrencyInput currency={'EUR'} />
        </label>
        <label className={s.label}>
          Конечная валюта: <CurrencyInput currency={'RSD'} />
        </label>
        <label className={s.label}>
          По курсу:{' '}
          <input type="number" className="cm-field" placeholder="0" />
        </label>
        <button className={setClass([[s.addButton], ['cm-field']])}>
          Добавить
        </button>
      </div>
    </section>
  );
}
