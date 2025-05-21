import { Platform } from '@shared/types/mochaApi';
import styles from './topBar.module.scss';
import { X } from 'lucide-react';

const TopBar = () => {
  const inlineStyle: Record<string, string> = {
    WebkitAppRegion: 'drag',
  };
  return (
    <>
      <div className={styles.container} style={inlineStyle}>
        <div></div>
        {window.mochaApi.window.platform === Platform.WINDOWS && (
          <div className={styles.windowActionContainer}>
            <button
              className={styles.btnCloseWindow}
              onClick={() => {
                console.log('testex');

                window.mochaApi.window.close();
              }}
            >
              <X />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TopBar;
