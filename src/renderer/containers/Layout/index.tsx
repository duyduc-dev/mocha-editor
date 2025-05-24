import TopBar from '@renderer/containers/Layout/TopBar';
import { Outlet } from 'react-router';
import styles from './layout.module.scss';
import SidebarContent from '@renderer/containers/Layout/SidebarContent';
import Sidebar from '@renderer/containers/Layout/Sidebar';
import BottomBar from '@renderer/containers/Layout/BottomBar';
import { Mosaic } from 'react-mosaic-component';
import { ReactNode, useMemo } from 'react';
import TabBar from '@renderer/containers/Layout/TabBar';
import Terminal from '@renderer/components/ui/Terminal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const ELEMENT_MAP: { [viewId: string]: ReactNode } = useMemo(
    () => ({
      sidebar: (
        <div className={styles.sideBarContent}>
          <SidebarContent />
        </div>
      ),
      content: (
        <div className={styles.content}>
          <TabBar />
          <div className={styles.children}>{children}</div>
        </div>
      ),
      terminal: <div></div>,
    }),
    [],
  );

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.contentContainer}>
            <Mosaic<string>
              className={styles.mosaic}
              resize={{
                minimumPaneSizePercentage: 10,
              }}
              renderTile={(id) => ELEMENT_MAP[id]}
              initialValue={{
                direction: 'row',
                first: 'sidebar',
                second: {
                  direction: 'column',
                  first: 'content',
                  second: 'terminal',
                },
                splitPercentage: 20,
              }}
            />
          </div>
          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
