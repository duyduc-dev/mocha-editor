import cx from 'classnames';
import React from 'react';
import styles from './spinner.module.scss';
import { hexToRgb } from '@renderer/utilities/colorUtils';
import { colors } from '@renderer/utilities/colors';

interface ISpinnerProps {
  styles?: React.CSSProperties;
  isCenter?: boolean;
  loaderClass?: string;
  className?: string;
  hexColor?: string;
}

const Spinner = (props: ISpinnerProps) => {
  const colorHex = props.hexColor || colors.orange[500];
  const colorRgb = hexToRgb(colorHex)!;

  return (
    <div
      className={cx(styles.container, props.className, {
        [styles.center]: props.isCenter ?? true,
      })}
      style={props.styles}
    >
      <div
        className={cx(
          styles.loader,
          props.loaderClass ? props.loaderClass : '',
        )}
        style={{
          borderColor: `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.5) ${colorHex} ${colorHex}`,
        }}
      />
    </div>
  );
};

export default Spinner;
