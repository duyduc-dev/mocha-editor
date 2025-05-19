import { FileNode } from '@shared/types/files';
import { FC, memo } from 'react';
import styles from './fileItem.module.scss';
import { colors } from '@renderer/utilities/colors';
import FileIcon from '@renderer/components/ui/FileIcon';
import classNames from 'classnames';
import { useAppDispatch } from '@renderer/store/common';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType, TabBarType } from '@renderer/store/layout/models';

interface IFileItem {
  file: FileNode;
  isExpand?: boolean;
}

const FileItem: FC<IFileItem> = (props) => {
  const { file, isExpand } = props;
  const dispatch = useAppDispatch();

  const handleDoubleClick = () => {
    if (file.isDirectory) return;
    dispatch(
      setTabAction({
        type: TabActionType.ADD,
        payload: {
          id: file.fullPath,
          name: file.name,
          path: file.fullPath,
          type: TabBarType.EDITOR,
        },
      }),
    );
  };

  return (
    <div
      className={classNames(
        styles.container,
        file.name.startsWith('.') && styles.fileHide,
      )}
      key={`${file.fullPath}-${file.name}`}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.labelContainer}>
        <div className={styles.iconWrapper}>
          <FileIcon
            name={file.name}
            isDirectory={file.isDirectory}
            isDirExpand={isExpand}
            width={14}
            height={14}
            color={colors.white}
          />
        </div>
        <p title={file.name} className={styles.label}>
          {file.name}
        </p>
      </div>
    </div>
  );
};

export default memo(FileItem);
