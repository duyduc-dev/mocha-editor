import { FileNode } from '@shared/types/files';
import { FC, memo } from 'react';
import { FolderClosed, Folder, File } from 'lucide-react';
import styles from './fileItem.module.scss';
import { colors } from '@renderer/utilities/colors';

interface IFileItem {
  file: FileNode;
  isExpand?: boolean;
}

const FileItem: FC<IFileItem> = (props) => {
  const { file, isExpand } = props;

  const renderIconExpand = () => {
    if (file.isDirectory)
      return isExpand ? (
        <FolderClosed size={16} color={colors.white} opacity={0.5} />
      ) : (
        <Folder size={16} color={colors.white} opacity={0.5} />
      );
    return <File size={16} color={colors.white} opacity={0.5} />;
  };

  return (
    <div className={styles.container} key={`${file.fullPath}-${file.name}`}>
      <div className={styles.labelContainer}>
        {renderIconExpand()}
        <p className={styles.label}>{file.name}</p>
      </div>
    </div>
  );
};

export default memo(FileItem);
