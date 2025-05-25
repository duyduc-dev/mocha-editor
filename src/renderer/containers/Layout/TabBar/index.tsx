import style from './tabBar.module.scss';
import { TabActionType, TabBarState } from '@renderer/store/layout/models';
import { FC, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '@renderer/store';
import FileIcon from '@renderer/components/ui/FileIcon';
import { CircleDot, X } from 'lucide-react';
import classNames from 'classnames';
import { setTabAction } from '@renderer/store/layout/slice';
import ScrollHorizontal from '@renderer/components/ui/ScrollHorizontal';

interface ITabBarProps {
  tabs: TabBarState;
  currentTab: string | null;
  setTabAction: typeof setTabAction;
}

const TabBar: FC<ITabBarProps> = (props) => {
  const { tabs, currentTab, setTabAction } = props;

  const handleActiveTab = (tabId: string) =>
    setTabAction({
      type: TabActionType.ACTIVE,
      payload: tabId,
    });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, tabId: string) => {
    if (e.button === 1) {
      handleCloseTab(e, tabId);
    }
  };

  const handleCloseTab = (e: MouseEvent<HTMLDivElement>, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setTabAction({
      type: TabActionType.CLOSE,
      payload: tabId,
    });
  };

  return (
    <div className={style.container}>
      <ScrollHorizontal
        className={classNames(style.tabsContainer, style.scrollHorizontal)}
      >
        {Object.values(tabs).map((tab) => (
          <div
            key={tab.id}
            className={classNames(style.tabItem, {
              [style.active]: tab.id === currentTab,
            })}
            onClick={() => handleActiveTab(tab.id)}
            onMouseDown={(e) => handleMouseDown(e, tab.id)}
          >
            <div className={style.tabItemContent}>
              <FileIcon name={tab.name} width={20} height={20} />
              <p>{tab.name}</p>
            </div>
            <div className={style.unsaveDot}>
              {!tab.saved && <CircleDot size={16} />}
            </div>
            <div
              className={style.iconContainer}
              onClick={(e) => handleCloseTab(e, tab.id)}
            >
              <X size={16} />
            </div>
          </div>
        ))}
      </ScrollHorizontal>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  tabs: state.layout.tabBars,
  currentTab: state.layout.currentTab,
});

const mapDispatchToProps = {
  setTabAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
