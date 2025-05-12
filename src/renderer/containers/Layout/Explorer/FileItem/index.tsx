import { FileNode } from '@shared/types/files';
import { FC, memo } from 'react';
import { Folder, FolderOpen } from 'lucide-react';
import styles from './fileItem.module.scss';
import { colors } from '@renderer/utilities/colors';
import FileIcon from '@renderer/components/ui/FileIcon';
import classNames from 'classnames';

interface IFileItem {
  file: FileNode;
  isExpand?: boolean;
}

const FileItem: FC<IFileItem> = (props) => {
  const { file, isExpand } = props;

  const renderIconExpand = () => {
    return (
      <FileIcon
        name={file.name}
        isDirectory={file.isDirectory}
        isDirExpand={isExpand}
        width={14}
        height={14}
        color={colors.white}
      />
    );
  };

  return (
    <div
      className={classNames(
        styles.container,
        file.name.startsWith('.') && styles.fileHide,
      )}
      key={`${file.fullPath}-${file.name}`}
    >
      <div className={styles.labelContainer}>
        {renderIconExpand()}
        <p className={styles.label}>{file.name}</p>
      </div>
    </div>
  );
};

export default memo(FileItem);
