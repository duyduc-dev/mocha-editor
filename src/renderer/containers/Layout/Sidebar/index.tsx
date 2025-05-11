import { sideBarTabs } from '@renderer/utilities/siteBar';
import styles from './siteBar.module.scss';
import Tooltip from '@renderer/components/ui/Tooltip';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { selectCurrentSideBarType } from '@renderer/store/layout/selector';
import { setSideBarType } from '@renderer/store/layout/slice';
import { SideBarType } from '@renderer/store/layout/models';

const Sidebar = () => {
  const currentTab = useAppSelector(selectCurrentSideBarType);
  const dispatch = useAppDispatch();

  const handleClickTab = (key?: SideBarType) => {
    dispatch(setSideBarType(key === currentTab ? undefined : key));
  };

  return (
    <div className={styles.container}>
      {sideBarTabs.map((tab) => (
        <div
          key={tab.key}
          data-tooltip-id="sidebar-tooltip"
          data-tooltip-content={tab.name}
          onClick={() => handleClickTab(tab.key)}
          className={classNames(
            styles.item,
            currentTab === tab.key && styles.active,
          )}
        >
          {tab.icon}
        </div>
      ))}
      <Tooltip id="sidebar-tooltip" delayShow={500} />
    </div>
  );
};

export default Sidebar;
