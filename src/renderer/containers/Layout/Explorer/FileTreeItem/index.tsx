import { FileNode } from '@shared/types/files';
import { FC, memo, Suspense, useEffect, useRef } from 'react';
import Collapse, { CollapseRef } from '@renderer/components/ui/Collapse';
import ListRender from '@renderer/components/ui/ListRender';
import FileItem from '@renderer/containers/Layout/Explorer/FileItem';
import styles from './fileTreeItem.module.scss';
import { showFileContextMenu } from '../FileExploreTree/FileContextMenu';
import OpenFolderAtPathEvent from '@renderer/events/OpenFolderAtPathEvent';

interface IFileTreeItem {
  file: FileNode;
  index?: number;
}

const FileTreeItem: FC<IFileTreeItem> = (props) => {
  const { file, index = 1 } = props;
  const collapseRef = useRef<CollapseRef>(null);

  const handleContextMenu = (event: any) =>
    showFileContextMenu(event, { file });

  useEffect(() => {
    return OpenFolderAtPathEvent.on((path) => {
      if (file.fullPath === path) {
        collapseRef.current?.openIndex(0);
      }
    });
  }, []);

  return (
    <div className={styles.container} key={`${file.fullPath}-${file.name}`}>
      {file.isDirectory ? (
        <Collapse
          ref={collapseRef}
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
              {!!item?.children?.length && (
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
