import { useAppDispatch } from '@renderer/store/common';
import { setWorkspacePath } from '@renderer/store/explorer/slice';
import {
  Item,
  ItemParams,
  Menu,
  contextMenu,
  Separator,
} from 'react-contexify';
import styles from './fileContextMenu.module.scss';
import { showModal } from '@renderer/store/modal/slice';
import { ModalType } from '@renderer/containers/ModalRoot/constants';
import { FilePlus2 } from 'lucide-react';
import { fileContextMenus, FileCxtMenuType } from './constants';
import { useLocale } from '@renderer/locale';

export const FILE_CONTEXT_MENU_ID = 'FileContextMenu';

export const showFileContextMenu = (e: any) => {
  contextMenu.show({
    id: FILE_CONTEXT_MENU_ID,
    event: e,
  });
};

const FileContextMenu = () => {
  const dispatch = useAppDispatch();
  const { t } = useLocale();

  const handleClick = (e: ItemParams) => {
    switch (e.id) {
      case FileCxtMenuType.CREATE_NEW_FILE:
        dispatch(
          showModal({
            type: ModalType.CREATE_NEW_FILE,
            data: e.props,
          }),
        );
        break;
      case FileCxtMenuType.REMOVE_WORKSPACE:
        dispatch(setWorkspacePath(null));
        break;
    }
  };

  return (
    <Menu id={FILE_CONTEXT_MENU_ID} color="dark" className={styles.container}>
      {fileContextMenus.map((menu) =>
        menu.separator ? (
          <div className={styles.separator}></div>
        ) : (
          <Item id={menu.id} onClick={handleClick} className={styles.item}>
            <div className={styles.itemWrap}>
              {menu?.icon}
              <span>{t(menu.title)}</span>
            </div>
          </Item>
        ),
      )}
    </Menu>
  );
};

export default FileContextMenu;
