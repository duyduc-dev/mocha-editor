import { ModalType } from '@renderer/containers/ModalRoot/constants';
import { ModalDataProps } from '@renderer/containers/ModalRoot/model';

export interface IModalState {
  type: ModalType | null;
  data?: any;
}

export interface ModalOption<
  TModalType extends keyof ModalDataProps = keyof ModalDataProps,
> {
  data?: ModalDataProps[TModalType];
  type: TModalType;
}
