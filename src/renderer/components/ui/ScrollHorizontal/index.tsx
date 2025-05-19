import { Children, ReactNode } from 'react';
import useHorizontalScroll from '@renderer/components/hooks/useHorizontalScroll';
import styles from './scrollHorizontal.module.scss';
import classNames from 'classnames';

type Props = {
  children?: ReactNode;
  className?: string;
};

const ScrollHorizontal = ({ children, className }: Props) => {
  const containerRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <div ref={containerRef} className={classNames(styles.container, className)}>
      {Children.map(children, (item) => item)}
    </div>
  );
};

export default ScrollHorizontal;
