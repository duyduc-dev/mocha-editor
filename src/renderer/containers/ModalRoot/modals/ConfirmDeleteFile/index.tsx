import { FC, useState } from 'react';
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
import { BounceLoader } from 'react-spinners';

const ConfirmDeleteFile: FC<ModalItemProps<ModalType.CONFIRM_DELETE_FILE>> = (
  props,
) => {
  const {
    data: { file },
    onClose,
  } = props.modalProps;

  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await window.mochaApi.fileSystem.deleteFile(file.fullPath);
      dispatch(
        setTabAction({
          type: TabActionType.CLOSE,
          payload: file.fullPath,
        }),
      );
      await dispatch(refetchExplorerSystem());
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>{t`deleteFile`}</h3>
        <div className={styles.description}>
          {t('deleteThisFileCannotUndone', {
            filename: file.name,
            b: ({ children, key }) => (
              <b key={key} className={styles.bold}>
                {children}
              </b>
            ),
          })}
        </div>
        <div className={styles.btnContainer}>
          <Button onClick={onClose}>{t`cancel`}</Button>
          <Button
            disabled={isLoading}
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            {isLoading && <BounceLoader size={18} color={'#fff'} />}
            {t`delete`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteFile;
