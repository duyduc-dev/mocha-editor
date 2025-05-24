import { ModalType } from '@renderer/containers/ModalRoot/constants';
import { FileNode } from '@shared/types/files';

export interface ModalProps<
  TModalType extends keyof ModalDataProps = keyof ModalDataProps,
> {
  type: TModalType;
  data: ModalDataProps[TModalType];
  onClose: () => void;
}

export interface ModalItemProps<T extends ModalType = ModalType> {
  modalProps: ModalProps<T>;
}

export type ModalDataProps = {
  [ModalType.CREATE_NEW_FILE]: ModalDataCreateNewFile;
};

interface ModalDataCreateNewFile {
  file: FileNode;
}
