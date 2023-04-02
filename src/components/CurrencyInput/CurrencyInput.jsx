export default function CurrencyInput({
  listId,
  currency,
  onChange,
}) {
  return (
    <input
      type="text"
      list={listId}
      size={4}
      className="cm-field"
      value={currency}
      onChange={onChange}
    />
  );
}
