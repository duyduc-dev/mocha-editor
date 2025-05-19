import { FileNode } from '@shared/types/files';
import { FC, memo, Suspense } from 'react';
import Collapse from '@renderer/components/ui/Collapse';
import ListRender from '@renderer/components/ui/ListRender';
import FileItem from '@renderer/containers/Layout/Explorer/FileItem';
import styles from './fileTreeItem.module.scss';

interface IFileTreeItem {
  file: FileNode;
}

const FileTreeItem: FC<IFileTreeItem> = (props) => {
  const { file } = props;
  return (
    <div className={styles.container} key={`${file.fullPath}-${file.name}`}>
      {file.isDirectory ? (
        <Collapse
          keyExtractor={(item) => `${item.fullPath}-${item.name}`}
          data={[file]}
          renderLabel={({ item, isExpand }) => (
            <FileItem file={item} isExpand={isExpand} />
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
        <FileItem file={file} />
      )}
    </div>
  );
};

export default memo(FileTreeItem);
