import { ComponentType } from 'react';
import { ModalType } from './constants';
import CreateNewFileModal from './modals/CreateNewFile';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { closeModal } from '@renderer/store/modal/slice';
import PortalRoot from '../PortalRoot';
import { FileNode } from '@shared/types/files';
import { ModalItemProps, ModalProps } from './model';
import ConfirmDeleteFile from '@renderer/containers/ModalRoot/modals/ConfirmDeleteFile';

type ModalDataProps = {
  [ModalType.CREATE_NEW_FILE]: {
    file: FileNode;
  };
};

const MODALS: Record<ModalType, ComponentType<ModalItemProps<any>>> = {
  [ModalType.CREATE_NEW_FILE]: CreateNewFileModal,
  [ModalType.CONFIRM_DELETE_FILE]: ConfirmDeleteFile,
};

const ModalRoot = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!modal.type) return null;
  const ModalComponent = MODALS[modal.type];
  return (
    <PortalRoot>
      <ModalComponent
        modalProps={{
          type: modal.type,
          data: modal.data,
          onClose: handleCloseModal,
        }}
      />
    </PortalRoot>
  );
};

export default ModalRoot;
