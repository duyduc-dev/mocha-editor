import styles from './sidebarContent.module.scss';
import Explorer from '@renderer/containers/Layout/Explorer';

const SidebarContent = () => {
  return (
    <div className={styles.container}>
      <Explorer />
    </div>
  );
};

export default SidebarContent;
