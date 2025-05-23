import { FC, ReactNode } from 'react';
import styles from './modal.module.scss';
import classNames from 'classnames';

interface IModalProps {
  children: ReactNode;
  onClose?: () => void;
  overlayClassName?: string;
  containerClassName?: string;
  className?: string;
}

const Modal: FC<IModalProps> = (props) => {
  const { children, className, containerClassName, overlayClassName, onClose } =
    props;

  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div
        className={classNames(styles.overlay, overlayClassName)}
        onClick={onClose}
      ></div>
      <div className={classNames(styles.main, className)}>{children}</div>
    </div>
  );
};

export default Modal;
