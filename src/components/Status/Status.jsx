import { MdCurrencyExchange } from 'react-icons/md';
import s from './Status.module.scss';

export default function Status({ timestamp, onClick }) {
  return (
    <button className={s.wrapper} onClick={onClick}>
      <span className={s.text}>
        Обновлено:
        <span className={s.date}>
          {timestamp
            ? new Date(timestamp).toLocaleString()
            : 'идет обновление...'}
        </span>
      </span>
      <span className={s.icon}>
        <MdCurrencyExchange />
      </span>
    </button>
  );
}
