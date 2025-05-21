import Modal from '@renderer/components/ui/Modal';
import { FC } from 'react';
import { ModalItemProps } from '../../model';

const CreateNewFileModal: FC<ModalItemProps> = (props) => {
  const { onClose } = props.modalProps;
  return <Modal onClose={onClose}>index</Modal>;
};

export default CreateNewFileModal;
