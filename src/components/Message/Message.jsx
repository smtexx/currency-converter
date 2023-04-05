import { BsCloudDownload } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { messages } from '../../screens/Converter/initialState';
import s from './Message.module.scss';
import { actions } from '../../screens/Converter/reducer';
import { setClass } from '../../lib/helpers';

export default function Message({ type, text, dispatch }) {
  // Иконки используемые для статусов
  const icons = [<BsCloudDownload />, <BiErrorCircle />];

  // Убрать отображение сообщения при статусе ready
  if (type === messages.ready) {
    return null;
  }

  function handleCloseMessage() {
    dispatch({
      type: actions.changeMessage,
      payload: {
        type: messages.ready,
        text: null,
      },
    });
  }

  return (
    <div
      className={setClass([
        [s.wrapper],
        [s.reference, type === messages.reference],
      ])}
    >
      <div
        className={`${s.icon} ${
          type === messages.loading ? s.animate : ''
        }`}
      >
        {icons[type]}
      </div>
      <p className={s.text}>{text}</p>
      {type === messages.reference && (
        <button
          className={s.closeButton}
          aria-label="Закрыть сообщение"
          title="Закрыть сообщение"
          onClick={handleCloseMessage}
        >
          <MdClear />
        </button>
      )}
    </div>
  );
}
