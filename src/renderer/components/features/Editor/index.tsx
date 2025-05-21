import CodeEditor from '@renderer/components/ui/CodeEditor';
import styles from './styles.module.scss';
import { useAppSelector } from '@renderer/store/common';
import { selectCurrentFile } from '@renderer/store/layout/selector';
import { useEffect, useState } from 'react';
import { Variables } from '@renderer/utilities/variable';

const Editor = () => {
  const file = useAppSelector(selectCurrentFile);
  const [currentFile, setCurrentFile] = useState<string>();
  const [height, setHeight] = useState(Variables.mainContentViewHeight);

  useEffect(() => {
    if (file)
      window.mochaApi.fileSystem.readFile(file.path).then((content) => {
        setCurrentFile(content);
      });
  }, [file]);

  useEffect(() => {
    function handleResize() {
      setHeight(Variables.mainContentViewHeight);
    }
    window.addEventListener('resize', handleResize);

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <CodeEditor
        value={currentFile}
        filename={file?.path}
        height={`${height}px`}
        onChange={setCurrentFile}
      />
    </div>
  );
};

export default Editor;
