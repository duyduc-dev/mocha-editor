import Modal from '@renderer/components/ui/Modal';
import { FC } from 'react';
import { ModalItemProps } from '../../model';
import styles from './createNewFile.module.scss';
import { FileNode } from '@shared/types/files';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { getPathFolder } from '@renderer/utilities/files';

type DataModal = {
  file: FileNode;
};

const validateSchema = z.object({
  pathCreate: z.string().nonempty('Path for create is required'),
  filename: z.string().nonempty('Filename is required'),
});

const CreateNewFileModal: FC<ModalItemProps<DataModal>> = (props) => {
  const { onClose, data } = props.modalProps;

  const { handleSubmit, register } = useForm<z.infer<typeof validateSchema>>({
    defaultValues: {
      pathCreate: getPathFolder(data.file),
      filename: 'NewFile',
    },
  });

  const onSubmit = handleSubmit((data) => {
    window.mochaApi.fileSystem.writeFile(data.pathCreate, data.filename);
    onClose();
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
          <input
            {...register('filename')}
            type="text"
            className={styles.input}
          />
        </div>
        <div className={styles.action}>
          <button type="submit" className={styles.btnCreateNewFile}>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateNewFileModal;
