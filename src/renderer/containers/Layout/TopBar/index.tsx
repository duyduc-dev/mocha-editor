import { Platform } from '@shared/types/mochaApi';
import styles from './topBar.module.scss';
import { X } from 'lucide-react';

const TopBar = () => {
  const inlineStyle: Record<string, string> = {
    WebkitAppRegion: 'drag',
  };
  return (
    <>
      <div className={styles.container} style={inlineStyle}></div>
      <div className={styles.windowActionContainer}>
        {window.mochaApi.window.platform === Platform.WINDOWS && (
          <button
            onClick={() => {
              console.log('testex');

              window.mochaApi.window.close();
            }}
          >
            <X />
          </button>
        )}
      </div>
    </>
  );
};

export default TopBar;
