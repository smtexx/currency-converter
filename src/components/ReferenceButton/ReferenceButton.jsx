import { AiOutlineQuestionCircle } from 'react-icons/ai';
import s from './ReferenceButton.module.scss';
import { actions } from '../../screens/Converter/reducer';
import { messages } from '../../screens/Converter/initialState';

export default function ReferenceButton({ dispatch, text }) {
  function handleClick() {
    dispatch({
      type: actions.changeMessage,
      payload: {
        type: messages.reference,
        text,
      },
    });
  }

  return (
    <button
      className={s.button}
      onClick={handleClick}
      aria-label="Показать справку"
      title="Показать справку"
    >
      <AiOutlineQuestionCircle />
    </button>
  );
}
