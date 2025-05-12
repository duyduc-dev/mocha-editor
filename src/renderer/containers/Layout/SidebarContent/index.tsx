import styles from './sidebarContent.module.scss';
import { lazy, Suspense } from 'react';
import Spinner from '@renderer/components/ui/Spinner';

const Explorer = lazy(() => import('@renderer/containers/Layout/Explorer'));

const SidebarContent = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Spinner />}>
        <Explorer />
      </Suspense>
    </div>
  );
};

export default SidebarContent;
