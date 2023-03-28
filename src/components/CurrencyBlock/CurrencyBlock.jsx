import s from './CurrencyBlock.module.scss';

export default function CurrencyBlock() {
  const codes = ['RUB', 'USD', 'KZT'];
  const uniqID = `CurrencyCode-${Math.floor(
    Math.random() * 10_000
  )}}`;

  return (
    <div className={s.wrapper}>
      <p className={s.name}>Доллар США</p>
      <div className={s.controls}>
        <div className={s.valueWrapper}>
          <input type="number" className={s.field} placeholder="0" />
        </div>
        <input
          type="text"
          placeholder="USD"
          list={uniqID}
          size={3}
          className={s.field}
        />
        <datalist id={uniqID}>
          {codes.map((code) => (
            <option value={code} key={code} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
