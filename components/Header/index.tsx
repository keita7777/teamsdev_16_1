"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./styles.module.css";
import Link from "next/link";
// import Image from "next/image";
// import Icon from "./img/icon-create.svg";
import { FaPenAlt } from "react-icons/fa";
import { auth } from "@/utils/firebase/config";
import { useEffect, useState } from "react";

const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setUserEmail(user?.email);
      } else {
        setIsLogin(false);
        setUserEmail(null);
      }
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <h1>logo</h1>
          {isLogin && userEmail && <p>{userEmail}</p>}
          <nav className={styles.nav}>
            <ul>
              <li className={styles.pcOnly}>
                <Link href="/">home</Link>
              </li>
              {isLogin && (
                <li>
                  <Link href="/create">
                    <span className={styles.icon}>
                      <FaPenAlt size={15} />
                    </span>
                    create
                  </Link>
                </li>
              )}

              <li className={`${styles.signIn} ${styles.pcOnly}`}>
                {isLogin ? (
                  // テスト用に簡易的にログアウトも実装
                  // 別のタスクでログアウト機能実装した場合この記述は不要
                  <button onClick={async () => await signOut(auth)} className={`${styles.signOut}`}>
                    log out
                  </button>
                ) : (
                  <Link href="/signin">sign in</Link>
                )}
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
