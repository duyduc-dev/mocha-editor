import styles from './styles.module.scss';
import MonacaEditor from '@renderer/components/features/Editor/MonacaEditor';
import { useAppSelector } from '@renderer/store/common';
import { selectCurrentFile } from '@renderer/store/layout/selector';
import { useEffect, useState } from 'react';
import CodeMirror from '@renderer/components/features/Editor/CodeMirror';

const Editor = () => {
  const file = useAppSelector(selectCurrentFile);
  const [currentFile, setCurrentFile] = useState<string>();

  useEffect(() => {
    if (file)
      window.mochaApi.fileSystem.readFile(file.path).then((content) => {
        setCurrentFile(content);
      });
  }, [file]);

  return (
    <div className={styles.container}>
      {/*<MonacaEditor language="typescript" value={currentFile}  />*/}
      <CodeMirror value={currentFile || ''} />
    </div>
  );
};

export default Editor;
