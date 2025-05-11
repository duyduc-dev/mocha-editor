import { ReactNode } from 'react';

type Props<T> = {
  data: Array<T>;
  renderItem: (item: T, index: number, thisData: Array<T>) => ReactNode;
  itemClassName?: string;
  containerClassName?: string;
  keyExtractor?: (item: T, index: number, thisData: Array<T>) => string;
  renderEmpty?: () => ReactNode;
};

export type ListRenderType<A> = (props: Props<A>) => ReactNode;

const ListRender = <T,>(props: Props<T>) => {
  const {
    containerClassName,
    itemClassName,
    data,
    keyExtractor = (_, index, thisD) => `${index}-${thisD.length}-item`,
    renderItem,
    renderEmpty,
  } = props;

  return (
    <div className={containerClassName}>
      {data.map((item, index, thisData) => (
        <div
          key={keyExtractor(item, index, thisData)}
          data-key={keyExtractor(item, index, thisData)}
          className={itemClassName}
        >
          {renderItem(item, index, thisData)}
        </div>
      ))}
      {data.length === 0 && renderEmpty?.()}
    </div>
  );
};

export default ListRender;
