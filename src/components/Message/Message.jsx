import { BsCloudDownload } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { messages } from '../../screens/Converter/initialState';
import s from './Message.module.scss';

export default function Message({ type, text }) {
  const icons = [<BsCloudDownload />, <BiErrorCircle />];

  if (type === messages.ready) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div
        className={`${s.icon} ${
          type === messages.loading ? s.animate : ''
        }`}
      >
        {icons[type]}
      </div>
      <p className={s.text}>{text}</p>
    </div>
  );
}
