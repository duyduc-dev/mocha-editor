import { FileNode } from '@shared/types/files';
import { FC, memo, Suspense } from 'react';
import Collapse from '@renderer/components/ui/Collapse';
import ListRender from '@renderer/components/ui/ListRender';
import FileItem from '@renderer/containers/Layout/Explorer/FileItem';
import styles from './fileTreeItem.module.scss';
import { showFileContextMenu } from '../FileExploreTree/FileContextMenu';

interface IFileTreeItem {
  file: FileNode;
  index?: number;
}

const FileTreeItem: FC<IFileTreeItem> = (props) => {
  const { file, index = 1 } = props;

  const handleContextMenu = (event: any) =>
    showFileContextMenu(event, { file });

  return (
    <div className={styles.container} key={`${file.fullPath}-${file.name}`}>
      {file.isDirectory ? (
        <Collapse
          keyExtractor={(item) => `${item.fullPath}-${item.name}`}
          data={[file]}
          renderLabel={({ item, isExpand }) => (
            <FileItem
              file={item}
              className={styles.fileItem}
              isExpand={isExpand}
              style={{ paddingLeft: `${index * 6}px` }}
              onContextMenu={handleContextMenu}
            />
          )}
          renderContent={({ item }) => (
            <>
              {item?.children?.length && (
                <Suspense fallback={<p>Loading</p>}>
                  <ListRender
                    keyExtractor={(childItem) =>
                      `${childItem.fullPath}-${childItem.name}`
                    }
                    data={item.children}
                    renderItem={(childItem) => (
                      <FileTreeItem file={childItem} index={index + 1} />
                    )}
                  />
                </Suspense>
              )}
            </>
          )}
        />
      ) : (
        <FileItem
          file={file}
          onContextMenu={handleContextMenu}
          className={styles.fileItem}
          style={{ paddingLeft: `${index * 6}px` }}
        />
      )}
    </div>
  );
};

export default memo(FileTreeItem);
