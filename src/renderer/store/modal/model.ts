import { ModalType } from '@renderer/containers/ModalRoot/constants';

export interface IModalState {
  type: ModalType | null;
  data?: any;
}

export interface ModalProps<T = any> {
  data: T;
  type: ModalType;
  onClose: () => void;
}

export interface ModalOption<T = any> {
  data?: T;
  type: ModalType;
}
