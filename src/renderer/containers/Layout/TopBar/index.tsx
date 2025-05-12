import styles from './topBar.module.scss';

const TopBar = () => {
  const inlineStyle: Record<string, string> = {
    WebkitAppRegion: 'drag',
  };
  return <div className={styles.container} style={inlineStyle} />;
};

export default TopBar;
