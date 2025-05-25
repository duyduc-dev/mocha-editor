import styles from './button.module.scss';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface IButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = (props) => {
  const { className, children, onClick } = props;
  return (
    <button
      tabIndex={0}
      onClick={onClick}
      className={classNames(styles.container, className)}
    >
      {children}
    </button>
  );
};

export default Button;
