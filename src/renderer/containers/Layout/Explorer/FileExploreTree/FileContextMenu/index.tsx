import { useAppDispatch } from '@renderer/store/common';
import { setWorkspacePath } from '@renderer/store/explorer/slice';
import { Item, ItemParams, Menu, contextMenu } from 'react-contexify';
import styles from './fileContextMenu.module.scss';
import { showModal } from '@renderer/store/modal/slice';
import { ModalType } from '@renderer/containers/ModalRoot/constants';

export const FILE_CONTEXT_MENU_ID = 'FileContextMenu';

export const showFileContextMenu = (e: any) => {
  contextMenu.show({
    id: FILE_CONTEXT_MENU_ID,
    event: e,
  });
};

const FileContextMenu = () => {
  const dispatch = useAppDispatch();

  const handleClick = (e: ItemParams) => {
    switch (e.id) {
      case 'create-new-file':
        dispatch(
          showModal({
            type: ModalType.CREATE_NEW_FILE,
          }),
        );
        break;
      case 'remove-workspace':
        dispatch(setWorkspacePath(null));
        break;
      default:
        break;
    }
  };

  return (
    <Menu id={FILE_CONTEXT_MENU_ID} className={styles.container}>
      <Item id="create-new-file" onClick={handleClick} className={styles.item}>
        <span>New file</span>
      </Item>
      <Item id="remove-workspace" onClick={handleClick} className={styles.item}>
        <span>Remove from workspace</span>
      </Item>
    </Menu>
  );
};

export default FileContextMenu;
