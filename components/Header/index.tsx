import styles from "./styles.module.css";
import Link from "next/link";
import Image from 'next/image';
import Icon from  './img/icon-create.svg';


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
              <Image src={Icon}  className={styles.icon} alt="アイコン" width={40} height={40}/> 
              create</Link>
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
