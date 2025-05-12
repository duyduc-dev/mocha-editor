import { useAppSelector } from '@renderer/store/common';
import { selectFileExplorer } from '@renderer/store/explorer/selector';
import ListRender from '@renderer/components/ui/ListRender';
import FileTreeItem from '@renderer/containers/Layout/Explorer/FileTreeItem';
import styles from './fileExploreTree.module.scss';

const FileExploreTree = () => {
  const fileExplorer = useAppSelector(selectFileExplorer);

  return (
    <div className={styles.container}>
      <ListRender
        keyExtractor={(item) => `${item.fullPath}`}
        data={fileExplorer}
        renderItem={(item) => <FileTreeItem file={item} />}
      />
    </div>
  );
};

export default FileExploreTree;
