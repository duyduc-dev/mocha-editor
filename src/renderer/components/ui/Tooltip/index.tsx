import React from 'react';
import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip';
import cx from 'classnames';
import styles from './tooltip.module.scss';

const Tooltip = ({ className = '', ...rest }: ITooltip) => {
  return <ReactTooltip className={cx(styles.tooltip, className)} {...rest} />;
};

export default Tooltip;
