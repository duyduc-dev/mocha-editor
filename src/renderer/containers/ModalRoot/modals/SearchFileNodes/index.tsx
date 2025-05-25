import { FC, useState } from 'react';
import styles from './searchFileNodes.module.scss';
import { ModalItemProps } from '@renderer/containers/ModalRoot/model';
import { ModalType } from '@renderer/containers/ModalRoot/constants';
import Modal from '@renderer/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { selectFileExplorer } from '@renderer/store/explorer/selector';
import {
  highlightMatch,
  searchFileNodesWithFuse,
} from '@renderer/utilities/files';
import classNames from 'classnames';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType, TabBarType } from '@renderer/store/layout/models';

const SearchFileNodes: FC<ModalItemProps<ModalType.SEARCH_FILE_NODES>> = ({
  modalProps,
}) => {
  const { onClose } = modalProps;
  const fileNodes = useAppSelector(selectFileExplorer);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  return (
    <Modal onClose={onClose} className={styles.container}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className={classNames('scrollMain', styles.list)}>
        {searchFileNodesWithFuse(fileNodes, value, ['.git', '.yarn']).map(
          (item) => (
            <div
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
              {highlightMatch(item.name, value)}{' - '}
              <span>({item.fullPath})</span>
            </div>
          ),
        )}
      </div>
    </Modal>
  );
};

export default SearchFileNodes;
