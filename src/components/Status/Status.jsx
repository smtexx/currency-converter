import { MdCurrencyExchange } from 'react-icons/md';
import s from './Status.module.scss';
import { setClass } from '../../lib/helpers';
import ReferenceButton from '../ReferenceButton/ReferenceButton';

export default function Status({ timestamp, dispatch }) {
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
      <ReferenceButton
        dispatch={dispatch}
        text={`Здесь показаны дата и время последнего обновления курсов валют 
          с сервера. Приложение использует бесплатный открытый источник
          данных (API). Но по причине того что он бесплатный, он обновляется
          только раз в сутки. Платный источник курсов валют обновляется гораздо 
          чаще, но стоит денег :( Если вы готовы проспонсировать это, свяжитесь
          с нами. Мы выступаем за бесплатное свободно распространяемое ПО без рекламы!`}
      />
    </div>
  );
}
