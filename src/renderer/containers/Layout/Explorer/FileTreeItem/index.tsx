import { FileNode } from '@shared/types/files';
import { FC, memo, Suspense } from 'react';
import Collapse from '@renderer/components/ui/Collapse';
import ListRender from '@renderer/components/ui/ListRender';
import FileItem from '@renderer/containers/Layout/Explorer/FileItem';
import styles from './fileTreeItem.module.scss';
import { useContextMenu } from 'react-contexify';
import { FILE_CONTEXT_MENU_ID } from '../FileExploreTree/FileContextMenu';

interface IFileTreeItem {
  file: FileNode;
}

const FileTreeItem: FC<IFileTreeItem> = (props) => {
  const { file } = props;
  const { show } = useContextMenu({
    id: FILE_CONTEXT_MENU_ID,
  });

  const handleContextMenu = (event: any) =>
    show({
      event: event,
      props: {
        file,
      },
    });

  return (
    <div className={styles.container} key={`${file.fullPath}-${file.name}`}>
      {file.isDirectory ? (
        <Collapse
          keyExtractor={(item) => `${item.fullPath}-${item.name}`}
          data={[file]}
          renderLabel={({ item, isExpand }) => (
            <FileItem
              file={item}
              isExpand={isExpand}
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
                      <FileTreeItem file={childItem} />
                    )}
                  />
                </Suspense>
              )}
            </>
          )}
        />
      ) : (
        <FileItem file={file} onContextMenu={handleContextMenu} />
      )}
    </div>
  );
};

export default memo(FileTreeItem);
