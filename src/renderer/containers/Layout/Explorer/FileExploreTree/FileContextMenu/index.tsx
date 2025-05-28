import { useAppDispatch } from '@renderer/store/common';
import { setWorkspacePath } from '@renderer/store/explorer/slice';
import {
  contextMenu,
  Item,
  ItemParams,
  Menu,
  TriggerEvent,
} from 'react-contexify';
import styles from './fileContextMenu.module.scss';
import { showModal } from '@renderer/store/modal/slice';
import { ModalType } from '@renderer/containers/ModalRoot/constants';
import { fileContextMenus, FileCxtMenuType } from './constants';
import { useLocale } from '@renderer/locale';
import { FileNode } from '@shared/types/files';
import { useCallback } from 'react';

export const FILE_CONTEXT_MENU_ID = 'FileContextMenu';

export const showFileContextMenu = (
  e: TriggerEvent,
  data: { file: FileNode },
) => {
  contextMenu.show({
    id: FILE_CONTEXT_MENU_ID,
    event: e,
    props: data,
  });
};

const FileContextMenu = () => {
  const dispatch = useAppDispatch();
  const { t } = useLocale();

  const handleClick = useCallback(async (e: ItemParams<{ file: FileNode }>) => {
    switch (e.id) {
      case FileCxtMenuType.CREATE_NEW_FILE:
      case FileCxtMenuType.CREATE_NEW_FOLDER:
        dispatch(
          showModal({
            type: ModalType.CREATE_NEW_FILE,
            data: {
              file: e.props?.file,
              newDir: e.id === FileCxtMenuType.CREATE_NEW_FOLDER,
            },
          }),
        );
        break;
      case FileCxtMenuType.DELETE_FILE: {
        if (e.props?.file) {
          dispatch(
            showModal({
              type: ModalType.CONFIRM_DELETE_FILE,
              data: e.props,
            }),
          );
        }
        break;
      }
      case FileCxtMenuType.REMOVE_WORKSPACE:
        dispatch(setWorkspacePath(null));
        break;
    }
  }, []);

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
