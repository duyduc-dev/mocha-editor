import { ComponentType } from 'react';
import { ModalType } from './constants';
import CreateNewFileModal from './modals/CreateNewFile';
import { ModalProps } from '@renderer/store/modal/model';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { closeModal } from '@renderer/store/modal/slice';
import PortalRoot from '../PortalRoot';

const MODALS: Record<ModalType, ComponentType<{ modalProps: ModalProps }>> = {
  [ModalType.CREATE_NEW_FILE]: CreateNewFileModal,
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
