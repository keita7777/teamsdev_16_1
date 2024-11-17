"use client";

import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.paginationBlock}>
        <li className={styles.prevpage}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={styles.paginationLiner}
            disabled={currentPage === 1}
          >
            <span>
              <FaArrowLeft size={10} /> Previous Page
            </span>
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i + 1)}
              className={`${styles.paginationItem} ${currentPage === i + 1 ? styles.active : ""}`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li className={styles.nextpage}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={styles.paginationLiner}
            disabled={currentPage === totalPages}
          >
            Next Page <FaArrowRight size={10} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
