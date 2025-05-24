import { FilePlus2, Trash } from 'lucide-react';
import { ReactNode } from 'react';

type FileContextMenuList =
  | {
      separator: false;
      id: FileCxtMenuType;
      icon?: ReactNode;
      title: string;
    }
  | {
      separator: true;
    };

export enum FileCxtMenuType {
  CREATE_NEW_FILE = 'CREATE_NEW_FILE',
  DELETE_FILE = 'DELETE_FILE',
  REMOVE_WORKSPACE = 'REMOVE_WORKSPACE',
}

export const fileContextMenus: FileContextMenuList[] = [
  {
    id: FileCxtMenuType.CREATE_NEW_FILE,
    icon: <FilePlus2 width={15} height={15} />,
    title: 'newFile',
    separator: false,
  },
  {
    separator: true,
  },
  {
    id: FileCxtMenuType.DELETE_FILE,
    title: 'delete',
    icon: <Trash width={15} height={15} />,
    separator: false,
  },
  {
    separator: true,
  },
  {
    id: FileCxtMenuType.REMOVE_WORKSPACE,
    title: 'removeFromWorkspace',
    separator: false,
  },
];
