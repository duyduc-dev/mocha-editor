import TopBar from '@renderer/containers/Layout/TopBar';
import { Outlet } from 'react-router';
import styles from './layout.module.scss';
import SidebarContent from '@renderer/containers/Layout/SidebarContent';
import Sidebar from '@renderer/containers/Layout/Sidebar';
import BottomBar from '@renderer/containers/Layout/BottomBar';

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
            <div className={styles.sideBarContent}>
              <SidebarContent />
            </div>
            <div className={styles.content}>
              <Outlet />
            </div>
          </div>
          <BottomBar/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
