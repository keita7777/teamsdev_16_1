import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.paginationBlock}>
        <li className={styles.prevpage}>
          <Link href="#" className={styles.paginationLiner}>
            <span>
              <FaArrowLeft size={10} /> Previous Page
            </span>
          </Link>
        </li>

        <li>
          <Link className={styles.paginationItem} href="#">
            1
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            2
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            3
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            4
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            5
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            6
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            7
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            8
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            9
          </Link>
        </li>
        <li>
          <Link className={styles.paginationItem} href="#">
            10
          </Link>
        </li>

        <li className={styles.nextpage}>
          <Link className={styles.paginationLiner} href="#">
            Next Page <FaArrowRight size={10} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
