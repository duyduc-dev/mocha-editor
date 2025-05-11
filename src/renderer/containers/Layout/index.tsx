import TopBar from '@renderer/components/ui/TopBar';
import { Outlet } from 'react-router';
import styles from './layout.module.scss';
import SidebarContent from '@renderer/containers/Layout/SidebarContent';
import Sidebar from '@renderer/containers/Layout/Sidebar';

const Layout = () => {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.sideBarContent}>
          <SidebarContent />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
