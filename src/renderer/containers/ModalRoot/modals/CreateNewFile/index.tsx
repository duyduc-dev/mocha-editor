import Modal from '@renderer/components/ui/Modal';
import { FC, useState } from 'react';
import { ModalItemProps } from '../../model';
import styles from './createNewFile.module.scss';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { getPathFolder } from '@renderer/utilities/files';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { selectWorkspaceFolder } from '@renderer/store/explorer/selector';
import { refetchExplorerSystem } from '@renderer/store/explorer/thunk';
import FileIcon from '@renderer/components/ui/FileIcon';
import { BounceLoader } from 'react-spinners';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType, TabBarType } from '@renderer/store/layout/models';
import { ModalType } from '@renderer/containers/ModalRoot/constants';

const validateSchema = z.object({
  pathCreate: z.string().nonempty('Path for create is required'),
  filename: z.string().nonempty('Filename is required'),
});

const CreateNewFileModal: FC<ModalItemProps<ModalType.CREATE_NEW_FILE>> = (
  props,
) => {
  const { onClose, data } = props.modalProps;

  const workspacePath = useAppSelector(selectWorkspaceFolder);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, watch } = useForm<
    z.infer<typeof validateSchema>
  >({
    defaultValues: {
      pathCreate: getPathFolder(data.file),
      filename: 'NewFile.tsx',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!workspacePath) return;
    const isExist = await window.mochaApi.fileSystem.existsFile(
      data.pathCreate,
      data.filename,
    );
    if (isExist) {
      alert(`(${data.filename}) already exist`);
      return;
    }
    setIsLoading(true);
    try {
      const pathFile = await window.mochaApi.fileSystem.writeFile(
        data.pathCreate,
        data.filename,
      );
      dispatch(
        setTabAction({
          type: TabActionType.ADD,
          payload: {
            id: pathFile,
            name: data.filename,
            path: pathFile,
            type: TabBarType.EDITOR,
            saved: true,
            value: null,
          },
        }),
      );
      await dispatch(refetchExplorerSystem());
    } finally {
      setIsLoading(false);
      onClose();
    }
  });

  return (
    <Modal onClose={onClose} className={styles.container}>
      <div className={styles.title}>Create new file</div>
      <form onSubmit={onSubmit}>
        <div className={styles.formInput}>
          <label htmlFor="pathNewFile">Create at:</label>
          <input
            id="pathNewFile"
            type="text"
            {...register('pathCreate')}
            className={styles.input}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="pathNewFile">Filename:</label>
          <div className={styles.wrapInputFileName}>
            <FileIcon width={16} height={16} name={watch('filename')} />
            <input
              {...register('filename')}
              type="text"
              autoFocus
              spellCheck={false}
              autoComplete={'off'}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.action}>
          <button
            disabled={isLoading}
            type="submit"
            className={styles.btnCreateNewFile}
          >
            {isLoading && <BounceLoader size={18} color={'#fff'} />}
            <span>Create</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateNewFileModal;
