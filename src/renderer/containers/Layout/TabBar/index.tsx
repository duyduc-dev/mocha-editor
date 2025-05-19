import style from './tabBar.module.scss';
import { TabActionType, TabBarState } from '@renderer/store/layout/models';
import { FC } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '@renderer/store';
import FileIcon from '@renderer/components/ui/FileIcon';
import { X } from 'lucide-react';
import classNames from 'classnames';
import { setTabAction } from '@renderer/store/layout/slice';
import ScrollBarVirtual from '@renderer/components/ui/ScrollBarVirtual';
import ScrollHorizontal from '@renderer/components/ui/ScrollHorizontal';

interface ITabBarProps {
  tabs: TabBarState;
  currentTab: string | null;
  setTabAction: typeof setTabAction;
}

const TabBar: FC<ITabBarProps> = (props) => {
  const { tabs, currentTab, setTabAction } = props;

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
            onClick={() =>
              setTabAction({
                type: TabActionType.ACTIVE,
                payload: tab.id,
              })
            }
          >
            <div className={style.tabItemContent}>
              <FileIcon name={tab.name} width={20} height={20} />
              <p>{tab.name}</p>
            </div>
            <div
              className={style.iconContainer}
              onClick={(e) => {
                e.stopPropagation();
                setTabAction({
                  type: TabActionType.CLOSE,
                  payload: tab.id,
                });
              }}
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
