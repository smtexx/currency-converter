import { MdCurrencyExchange } from 'react-icons/md';
import s from './Status.module.scss';
import { setClass } from '../../lib/helpers';

export default function Status({ timestamp }) {
  return (
    <div className={setClass([[s.wrapper], ['cm-block']])}>
      <span className={s.icon}>
        <MdCurrencyExchange />
      </span>
      <span className={s.text}>
        Обновлено:
        <span className={s.date}>
          {timestamp
            ? new Date(timestamp).toLocaleString()
            : 'идет обновление...'}
        </span>
      </span>
    </div>
  );
}
