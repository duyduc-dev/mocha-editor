import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import {
  selectFileExplorer,
  selectWorkspaceFolder,
} from '@renderer/store/explorer/selector';
import ListRender from '@renderer/components/ui/ListRender';
import FileTreeItem from '@renderer/containers/Layout/Explorer/FileTreeItem';
import styles from './fileExploreTree.module.scss';
import { Suspense, useEffect } from 'react';
import {
  fetchExplorerSystem,
  fetchPathDirectory,
} from '@renderer/store/explorer/thunk';
import Button from '@renderer/components/ui/Button';
import ScrollBarVirtual from '@renderer/components/ui/ScrollBarVirtual';
import FileContextMenu from './FileContextMenu';
import PortalRoot from '@renderer/containers/PortalRoot';

const FileExploreTree = () => {
  const fileExplorer = useAppSelector(selectFileExplorer);
  const workspacePath = useAppSelector(selectWorkspaceFolder);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (workspacePath) {
      dispatch(fetchExplorerSystem(workspacePath));
    }
  }, [workspacePath]);

  return (
    <ScrollBarVirtual
      noScrollX
      disableTracksWidthCompensation
      wrapperProps={{
        className: styles.wrapper,
      }}
      trackYProps={{ className: styles.trackYScroll }}
      thumbYProps={{ className: styles.thumbYScroll }}
      className={styles.container}
    >
      {workspacePath ? (
        <Suspense fallback={<p>Loading</p>}>
          <ListRender
            keyExtractor={(item) => `${item.fullPath}`}
            data={fileExplorer}
            renderItem={(item) => <FileTreeItem file={item} />}
          />
          <PortalRoot>
            <FileContextMenu />
          </PortalRoot>
        </Suspense>
      ) : (
        <div className={styles.btnOpenWorkspaceContainer}>
          <Button onClick={() => dispatch(fetchPathDirectory())}>
            Open workspace
          </Button>
        </div>
      )}
    </ScrollBarVirtual>
  );
};

export default FileExploreTree;
