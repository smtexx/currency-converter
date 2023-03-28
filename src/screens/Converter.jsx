import CurrencyBlock from '../components/CurrencyBlock/CurrencyBlock';
import Message from '../components/Message/Message';
import Status from '../components/Status/Status';

export default function Converter() {
  return (
    <>
      <Status />
      <CurrencyBlock />
      <CurrencyBlock />
      <Message />
    </>
  );
}
