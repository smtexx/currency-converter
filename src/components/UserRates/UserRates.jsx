import { MdDoubleArrow, MdClear } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import { setClass } from '../../lib/helpers';
import s from './UserRates.module.scss';

export default function UserRates() {
  const rates = {
    EUR: {
      to: 'RSD',
      rate: 1.4,
      value: 117.5,
    },
    RSD: {
      to: 'RUB',
      rate: 0.6,
      value: 45,
    },
  };

  return (
    <section className={setClass([[s.wrapper], ['cm-block']])}>
      <header className={s.header}>
        <span className={s.icon}>
          <FiAlertCircle />
        </span>
        <h2 className={s.title}>Сохраненные курсы</h2>
      </header>
      <ul className={s.rates}>
        {Object.entries(rates).map(([from, { to, value }]) => (
          <li className={s.rate}>
            <span className={s.rateFrom}>{from}</span>
            <span className={s.rateArrow}>
              <MdDoubleArrow />
            </span>
            <span className={s.rateTo}>{to}</span>
            <span className={s.rateArrow}>
              <MdDoubleArrow />
            </span>
            <span className={s.rateValue}>{value}</span>
            <button className={s.closeButton}>
              <MdClear />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
