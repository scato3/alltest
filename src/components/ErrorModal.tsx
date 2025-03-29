"use client";

import { useEffect, useState } from "react";
import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export const ErrorModal = ({ title, message, onClose }: ErrorModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.error_modal_container}>
      {/* 배경 오버레이 */}
      <div className={styles.error_modal_overlay} onClick={handleClose} />

      {/* 모달 */}
      <div className={styles.error_modal_content_wrapper}>
        <div className={styles.error_modal_content}>
          {/* 모달 헤더 */}
          <div className={styles.error_modal_header}>
            <div className={styles.error_modal_icon_wrapper}>
              <div className={styles.error_modal_icon}>
                {/* 에러 아이콘 */}
                <svg
                  className={styles.error_icon}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className={styles.error_modal_text}>
                <h3 className={styles.error_modal_title}>{title}</h3>
                <div className={styles.error_modal_message}>
                  <p>{message}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 모달 푸터 */}
          <div className={styles.error_modal_footer}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.error_modal_button}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
