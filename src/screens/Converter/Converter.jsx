import { useEffect, useReducer } from 'react';
import { loadRates } from '../../api/loadRates';
import CurrencyBlock from '../../components/CurrencyBlock/CurrencyBlock';
import Message from '../../components/Message/Message';
import Status from '../../components/Status/Status';
import { useTitle } from '../../lib/hooks';
import { selectCurrenciesData } from '../../processing/selectCurrenciesData';
import { initialState, messages } from './initialState';
import { actions, reducer } from './reducer';

export default function Converter() {
  // Подключение редьюсера
  const [state, dispatch] = useReducer(reducer, initialState);

  // Функция для отправки запроса данных с курсами на сервер
  async function handleUpdate() {
    dispatch({
      type: actions.changeMessage,
      payload: {
        type: messages.loading,
        text: 'Загрузка курсов валют',
      },
    });
    const result = await loadRates(selectCurrenciesData);
    if (result.error) {
      dispatch({
        type: actions.changeMessage,
        payload: {
          type: messages.error,
          text: result.error,
        },
      });
    } else {
      dispatch({ type: actions.updateRates, payload: result.data });
    }
  }

  // Обновление курсов валют при загрузки приложения
  useEffect(() => {
    setTimeout(() => handleUpdate(), 1000);
  }, []);

  // Изменить title
  useTitle('Конвертер валют');

  return (
    <>
      <Status timestamp={state.updated} onClick={handleUpdate} />
      {/* Выполнить рендер блоков с курсами валют */}
      {state.currencyBlocks.map((block, index) => (
        <CurrencyBlock
          index={index}
          dispatch={dispatch}
          rates={state.rates}
          key={index}
          {...block}
        />
      ))}
      <Message type={state.message.type} text={state.message.text} />
    </>
  );
}
