import { MdDoubleArrow, MdClear } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import { setClass } from '../../lib/helpers';
import s from './UserRates.module.scss';
import { transformUserRates } from '../../processing/transformUserRates';
import { actions } from '../../screens/Converter/reducer';
import ReferenceButton from '../ReferenceButton/ReferenceButton';

export default function UserRates({ rates, dispatch }) {
  const userRates = transformUserRates(rates);

  function handleDelete(from, to) {
    dispatch({
      type: actions.deleteUserRate,
      payload: {
        from,
        to,
      },
    });
  }

  return (
    <section className={setClass([[s.wrapper], ['cm-block']])}>
      <header className={s.header}>
        <span className={s.icon}>
          <FiAlertCircle />
        </span>
        <h2 className={s.title}>Сохраненные курсы</h2>
      </header>
      <ul className={s.rates}>
        {userRates.length === 0
          ? 'Сохраненные курсы валют отсутствуют'
          : userRates.map(({ from, to, value }) => (
              <li className={s.rate} key={`${from}-${to}`}>
                <span className={s.rateFrom}>{from}</span>
                <span className={s.rateArrow}>
                  <MdDoubleArrow />
                </span>
                <span className={s.rateTo}>{to}</span>
                <span className={s.rateArrow}>
                  <MdDoubleArrow />
                </span>
                <span className={s.rateValue}>{value}</span>
                <button
                  className={s.closeButton}
                  aria-label="Delete"
                  onClick={() => handleDelete(from, to)}
                >
                  <MdClear />
                </button>
              </li>
            ))}
      </ul>
      <ReferenceButton
        dispatch={dispatch}
        text={`
        В этом блоке показаны ваши пользовательские курсы. Будьте
        внимательны, конвертация осуществляется по ним, вместо
        банковских курсов! Вы можете удалять пользовательские курсы. При 
        этом происходит пересчет курса валют, если этот курс задействован 
        в соответствующих блоках.
      `}
      />
    </section>
  );
}
