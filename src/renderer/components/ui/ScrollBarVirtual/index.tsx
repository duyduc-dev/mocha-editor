import { FC } from 'react';
import Scrollbar, { ScrollbarProps } from 'react-scrollbars-custom';
import styles from './scrollBarVirtual.module.scss';
import classNames from 'classnames';

interface IScrollBarVirtualProps extends ScrollbarProps {
  className?: string;
  children?: React.ReactNode;
}

const ScrollBarVirtual: FC<IScrollBarVirtualProps> = (props) => {
  const { children, className, ref, ...rest } = props;
  return (
    <Scrollbar
      ref={ref as any}
      className={classNames(styles.container, className)}
      {...rest}
    >
      {children}
    </Scrollbar>
  );
};

export default ScrollBarVirtual;
