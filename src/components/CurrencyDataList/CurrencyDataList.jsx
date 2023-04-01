export default function CurrencyDataList({ rates, id }) {
  return (
    <datalist id={id}>
      {Object.keys(rates).map((code) => (
        <option value={code} key={code} />
      ))}
    </datalist>
  );
}
