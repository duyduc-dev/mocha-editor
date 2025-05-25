import { FC, ReactNode } from 'react';
import styles from './confirmDeleteFile.module.scss';
import { ModalItemProps } from '@renderer/containers/ModalRoot/model';
import { ModalType } from '@renderer/containers/ModalRoot/constants';
import Modal from '@renderer/components/ui/Modal';
import { useLocale } from '@renderer/locale';
import Button from '@renderer/components/ui/Button';
import { useAppDispatch } from '@renderer/store/common';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType } from '@renderer/store/layout/models';
import { refetchExplorerSystem } from '@renderer/store/explorer/thunk';

const ConfirmDeleteFile: FC<ModalItemProps<ModalType.CONFIRM_DELETE_FILE>> = (
  props,
) => {
  const {
    data: { file },
    onClose,
  } = props.modalProps;

  const { t } = useLocale();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await window.mochaApi.fileSystem.deleteFile(file.fullPath);
    dispatch(
      setTabAction({
        type: TabActionType.CLOSE,
        payload: file.fullPath,
      }),
    );
    await dispatch(refetchExplorerSystem());
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>{t`deleteFile`}</h3>
        <div className={styles.description}>
          {t('deleteThisFileCannotUndone', {
            filename: file.name,
            b: ({ children }) => <b className={styles.bold}>{children}</b>,
          })}
        </div>
        <div className={styles.btnContainer}>
          <Button onClick={onClose}>{t`cancel`}</Button>
          <Button className={styles.deleteBtn} onClick={handleDelete}>
            {t`delete`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteFile;
