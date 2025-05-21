import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function PortalRoot({ children }: PropsWithChildren) {
  return createPortal(children, document.querySelector('#portal-root')!);
}
