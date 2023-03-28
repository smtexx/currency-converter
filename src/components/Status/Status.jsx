import { MdCurrencyExchange } from 'react-icons/md';
import s from './Status.module.scss';

export default function Status() {
  return (
    <button className={s.wrapper}>
      <span className={s.text}>
        Обновлено:
        <span className={s.date}>04.04.2023 14:09:34</span>
      </span>
      <span className={s.icon}>
        <MdCurrencyExchange />
      </span>
    </button>
  );
}
