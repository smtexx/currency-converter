import { MdCurrencyExchange } from 'react-icons/md';
import { contacts } from '../data/contacts';
import s from './Layout.module.scss';

export default function Layout({ main, message }) {
  return (
    <div className={s.wrapperOuter}>
      <picture className={s.background}>
        <source
          type="image/webp"
          srcSet="images/money-1280.webp 1280w, images/money-1920.webp 1920w"
        />
        <img
          src="images/money-1280.jpg"
          alt=""
          srcset="images/money-1280.jpg 1280w, images/money-1920.jpg 1920w"
        />
      </picture>

      <div className={s.wrapperInner}>
        <header className={s.header}>
          <h1>Currency Converter</h1>
          <MdCurrencyExchange />
        </header>
        <main className={s.main}>
          {main}
          {message && <div className={s.message}>{message}</div>}
        </main>
        <footer className={s.footer}>
          <p className={s.createdBy}>
            Created by:{' '}
            <a className={s.email} href={`mailto:${contacts.email}`}>
              {contacts.email}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
