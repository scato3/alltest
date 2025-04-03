import styles from './styles.module.scss';

interface PopupProps {
  title?: string;
  message: string;
  onClose: () => void;
}

const Popup = ({ title, message, onClose }: PopupProps) => {
  return (
    <div className={styles.dimmed}>
      <div className={styles.popup}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Popup;
