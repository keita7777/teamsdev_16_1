import styles from "./styles.module.css";
import Link from "next/link";
// import Image from "next/image";
// import Icon from "./img/icon-create.svg";
import { FaPenAlt } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <h1>logo</h1>

          <nav className={styles.nav}>
            <ul>
              <li className={styles.pcOnly}>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/create">
                  <FaPenAlt className={styles.icon} />
                  create
                </Link>
              </li>
              <li className={`${styles.signIn} ${styles.pcOnly}`}>
                <Link href="/signIn">sign in</Link>
              </li>
            </ul>
          </nav>

          {/* ハンバーガーメニューのボタン */}
          <button className={styles.hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
