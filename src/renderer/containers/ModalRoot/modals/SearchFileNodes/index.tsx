import { FC, useMemo, useState, useDeferredValue } from 'react';
import styles from './searchFileNodes.module.scss';
import { ModalItemProps } from '@renderer/containers/ModalRoot/model';
import { ModalType } from '@renderer/containers/ModalRoot/constants';
import Modal from '@renderer/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import {
  selectFileExplorer,
  selectWorkspaceFolder,
} from '@renderer/store/explorer/selector';
import {
  flattenFileTree,
  getPathBaseOnRoot,
  highlightMatch,
} from '@renderer/utilities/files';
import classNames from 'classnames';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType, TabBarType } from '@renderer/store/layout/models';
import FileIcon from '@renderer/components/ui/FileIcon';

const SearchFileNodes: FC<ModalItemProps<ModalType.SEARCH_FILE_NODES>> = ({
  modalProps,
}) => {
  const { onClose } = modalProps;
  const fileNodes = useAppSelector(selectFileExplorer);
  const workspacePath = useAppSelector(selectWorkspaceFolder);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const delayValue = useDeferredValue(value, 'none');

  const resultSearch = useMemo(
    () =>
      flattenFileTree(
        fileNodes,
        (node) =>
          node.fullPath.toLowerCase().includes(delayValue.toLowerCase()) ||
          node.name.toLowerCase().includes(delayValue.toLowerCase()) ||
          delayValue.toLowerCase().includes(node.fullPath.toLowerCase()) ||
          delayValue.toLowerCase().includes(node.name.toLowerCase()),
        ['.git', '.yarn', '.vite'],
      ),
    [delayValue, fileNodes],
  );

  return (
    <Modal onClose={onClose} className={styles.container}>
      <div className={styles.title}>Search file ({resultSearch.length})</div>

      <div className={styles.formSearch}>
        <input
          autoFocus
          type="text"
          value={value}
          className={styles.inputSearch}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className={classNames('scrollMain', styles.list)}>
        {resultSearch.map((item) => (
          <div
            className={styles.item}
            key={item.fullPath}
            onClick={() => {
              if (item.isDirectory) return;
              dispatch(
                setTabAction({
                  type: TabActionType.ADD,
                  payload: {
                    id: item.fullPath,
                    name: item.name,
                    path: item.fullPath,
                    type: TabBarType.EDITOR,
                    saved: true,
                    value: null,
                  },
                }),
              );
              onClose();
            }}
          >
            <p className={styles.wrapName}>
              <FileIcon name={item.name} width={16} height={16} />{' '}
              <span>{highlightMatch(item.name, value)}</span>
            </p>
            <p className={styles.filePath}>
              {highlightMatch(
                getPathBaseOnRoot(workspacePath || '', item.fullPath),
                value,
              )}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SearchFileNodes;
