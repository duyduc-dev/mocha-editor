import TopBar from '@renderer/containers/Layout/TopBar';
import { Outlet } from 'react-router';
import styles from './layout.module.scss';
import SidebarContent from '@renderer/containers/Layout/SidebarContent';
import Sidebar from '@renderer/containers/Layout/Sidebar';
import BottomBar from '@renderer/containers/Layout/BottomBar';
import { Mosaic } from 'react-mosaic-component';
import { ReactNode } from 'react';
import TabBar from '@renderer/containers/Layout/TabBar';

const ELEMENT_MAP: { [viewId: string]: ReactNode } = {
  sidebar: (
    <div className={styles.sideBarContent}>
      <SidebarContent />
    </div>
  ),
  content: (
    <div className={styles.content}>
      <TabBar />
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  ),
};

const Layout = () => {
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
                second: 'content',
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
