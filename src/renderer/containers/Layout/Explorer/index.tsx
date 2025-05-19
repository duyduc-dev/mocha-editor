import Collapse from '@renderer/components/ui/Collapse';

import styles from './explorer.module.scss';
import FileLabel from '@renderer/containers/Layout/Explorer/FileLabel';
import FileExploreTree from '@renderer/containers/Layout/Explorer/FileExploreTree';

const Explorer = () => {
  const tabs = [
    {
      title: 'Explorer',
    },
  ];

  return (
    <div className={styles.container}>
      <Collapse
        data={tabs}
        keyExtractor={(item) => item.title}
        renderLabel={({ item, isExpand }) => (
          <FileLabel title={item.title} isExpand={isExpand} />
        )}
        className={styles.list}
        itemClassName={styles.item}
        contentClassName={styles.contentContainer}
        renderContent={() => <FileExploreTree />}
      />
    </div>
  );
};

export default Explorer;
