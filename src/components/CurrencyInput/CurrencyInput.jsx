export default function CurrencyInput({
  listId,
  currency,
  handleCurrencyInput,
}) {
  return (
    <input
      type="text"
      list={listId}
      size={4}
      className="cm-field"
      value={currency}
      onInput={handleCurrencyInput}
    />
  );
}
