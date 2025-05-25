import styles from './button.module.scss';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface IButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = (props) => {
  const { disabled, className, children, onClick } = props;
  return (
    <button
      tabIndex={0}
      onClick={onClick}
      className={classNames(styles.container, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
