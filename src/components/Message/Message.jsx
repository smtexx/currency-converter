import { BsCloudDownload } from 'react-icons/bs';
import s from './Message.module.scss';

export default function Message() {
  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <BsCloudDownload />
      </div>
      <p className={s.text}>Загрузка курсов валют</p>
    </div>
  );
}
