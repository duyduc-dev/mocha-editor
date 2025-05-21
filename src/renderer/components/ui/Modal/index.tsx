import { FC, ReactNode } from 'react';
import styles from './modal.module.scss';

interface IModalProps {
  children: ReactNode;
  onClose?: () => void;
}

const Modal: FC<IModalProps> = (props) => {
  const { children, onClose } = props;

  return (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Modal;
