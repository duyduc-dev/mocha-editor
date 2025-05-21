import styles from './styles.module.scss';
import { useAppSelector } from '@renderer/store/common';
import { selectCurrentFile } from '@renderer/store/layout/selector';
import { useEffect, useState } from 'react';

const Editor = () => {
  const file = useAppSelector(selectCurrentFile);
  const [currentFile, setCurrentFile] = useState<string>();

  useEffect(() => {
    if (file)
      window.mochaApi.fileSystem.readFile(file.path).then((content) => {
        setCurrentFile(content);
      });
  }, [file]);

  return <div className={styles.container}></div>;
};

export default Editor;
