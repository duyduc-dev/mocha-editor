import styles from './fileLabel.module.scss';
import { FC } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { colors } from '@renderer/utilities/colors';

interface IFileLabelProps {
  title: string;
  isExpand: boolean;
}

const FileLabel: FC<IFileLabelProps> = (props) => {
  const { isExpand, title } = props;
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {isExpand ? (
          <ChevronDown size={20} opacity={0.5} color={colors.white} />
        ) : (
          <ChevronRight size={20} opacity={0.5} color={colors.white} />
        )}
        <p className={styles.label}>{title}</p>
      </div>
    </div>
  );
};

export default FileLabel;
