import { filter, times } from 'lodash';
import {
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import ListRender from '../ListRender';

type RenderProps<T> = {
  item: T;
  index: number;
  list: T[];
  isExpand: boolean;
};

type Props<T> = {
  data: T[];
  renderLabel: (p: RenderProps<T>) => ReactNode;
  renderContent: (p: RenderProps<T>) => ReactNode;
  ref?: Ref<CollapseRef>;
  lazyExpand?: (keyof T)[];
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  defaultExpandIndex?: number[];
  keyExtractor?: (item: T, index: number, thisData: Array<T>) => string;
};

export type CollapseRef = {
  openAll: () => void;
  closeAll: () => void;
  toggleIndex: (index: number) => void;
  openIndex: (index: number) => void;
  closeIndex: (index: number) => void;
};

export type CollapseComponentType<T> = (props: Props<T>) => ReactNode;

const Collapse = <T,>(props: Props<T>) => {
  const {
    ref,
    data,
    labelClassName,
    contentClassName,
    className,
    itemClassName,
    defaultExpandIndex = [],
    keyExtractor,
    disabled,
    renderContent,
    renderLabel,
    lazyExpand = [],
  } = props;

  const [indexActives, setIndexActives] =
    useState<Array<number>>(defaultExpandIndex);
  const [renderedIndexes, setRenderedIndexes] = useState<Array<number>>([]);

  const prevDataRef = useRef<Array<T>>(data);

  const isRendered = (index: number) => renderedIndexes.includes(index);
  const isActive = (index: number) => indexActives.includes(index);

  const markRendered = (index: number) => {
    setRenderedIndexes((prev) =>
      prev.includes(index) ? prev : [...prev, index],
    );
  };

  const handleClickLabel = (index: number) => {
    if (disabled) {
      return;
    }
    if (isActive(index)) {
      setIndexActives((prev) => filter(prev, (item) => item !== index));
    } else {
      setIndexActives((prev) => [...prev, index]);
      markRendered(index);
    }
  };

  useEffect(() => {
    // If lazyExpand fields change in the data, we should re-render affected indexes
    if (lazyExpand.length > 0) {
      data.forEach((item, index) => {
        const prevItem = prevDataRef.current[index];
        const hasChanged = lazyExpand.some((key) => {
          return prevItem?.[key] !== item?.[key];
        });
        if (hasChanged) {
          setRenderedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : prev,
          );
        }
      });
      prevDataRef.current = data;
    }
  }, [data, lazyExpand]);

  useImperativeHandle(ref, () => ({
    closeAll: () => setIndexActives([]),
    openAll: () => {
      setIndexActives(times(data.length));
      setRenderedIndexes(times(data.length)); // render all at once
    },
    toggleIndex: (index: number) => {
      if (isActive(index)) {
        const findIndex = indexActives.findIndex((item) => item === index);
        if (findIndex > -1) {
          setIndexActives((prev) => {
            prev.splice(findIndex, 1);
            return prev;
          });
        }
      } else {
        setIndexActives((prev) => [...prev, index]);
        markRendered(index);
      }
    },
    openIndex(index) {
      if (!isActive(index)) {
        setIndexActives((prev) => [...prev, index]);
        markRendered(index);
      }
    },
    closeIndex(index) {
      const findIndex = indexActives.findIndex((item) => item === index);
      if (findIndex > -1) {
        setIndexActives((prev) => {
          prev.splice(findIndex, 1);
          return prev;
        });
      }
    },
  }));

  return (
    <ListRender
      data={data}
      containerClassName={className}
      itemClassName={itemClassName}
      keyExtractor={keyExtractor}
      renderItem={(item, index, thisData) => (
        <>
          <div
            className={labelClassName}
            role="presentation"
            onClick={() => handleClickLabel(index)}
          >
            {renderLabel({
              item: item,
              index,
              list: thisData,
              isExpand: isActive(index),
            })}
          </div>
          <div
            className={contentClassName}
            style={{ display: isActive(index) ? 'block' : 'none' }}
          >
            {isRendered(index) &&
              renderContent({
                item: item,
                index,
                list: thisData,
                isExpand: isActive(index),
              })}
          </div>
        </>
      )}
    />
  );
};

export default Collapse;
