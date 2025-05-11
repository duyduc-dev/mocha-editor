import { ReactNode } from 'react';
import { File, Search } from 'lucide-react';
import { colors } from '@renderer/utilities/colors';
import { SideBarType } from '@renderer/store/layout/models';

export interface ISideBarTab {
  key: SideBarType;
  name: string;
  icon: ReactNode;
}

export const sideBarTabs: ISideBarTab[] = [
  {
    key: 'explorer',
    name: 'Explorer',
    icon: <File width={24} height={24} color={colors.white} />,
  },
  {
    key: 'search-explorer',
    name: 'Search',
    icon: <Search width={24} height={24} color={colors.white} />,
  },
];
