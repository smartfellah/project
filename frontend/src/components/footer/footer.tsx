import styles from "./footer.module.css";
import { Logo } from "../logo/logo";

export const Footer = () => {
  return (
    <div className={styles.Container}>
      <div>
        <a className={styles.Link} href="https://hh.ru/">
          HeadHunter
        </a>
      </div>
      <div>
        <Logo></Logo>
      </div>
      <div className={styles.Social}>
        <a
          className={styles.Link}
          href="https://web.telegram.org/"
          target="_blank"
        >
          Telegram
        </a>
        <a className={styles.Link} href="https://vk.com/" target="_blank">
          VK
        </a>
      </div>
    </div>
  );
};
