import CodeEditor from '@renderer/components/ui/CodeEditor';
import styles from './styles.module.scss';
import { useAppSelector } from '@renderer/store/common';
import { selectCurrentFile } from '@renderer/store/layout/selector';
import { useEffect, useState } from 'react';
import { Variables } from '@renderer/utilities/variable';
import { getPathFolder } from '@renderer/utilities/files';
import { debounce } from 'lodash';
import ClearContentEditorEvent from '@renderer/events/editor/ClearContentEditorEvent';

const Editor = () => {
  const currentFile = useAppSelector(selectCurrentFile);
  const [contentFile, setContentFile] = useState<string>();
  const [height, setHeight] = useState(Variables.mainContentViewHeight);

  useEffect(handleReadFile, [currentFile]);
  function handleReadFile() {
    if (currentFile)
      window.mochaApi.fileSystem.readFile(currentFile.path).then((content) => {
        setContentFile(content);
      });
  }

  useEffect(handleResizeEffect, []);
  function handleResizeEffect() {
    function handleResize() {
      setHeight(Variables.mainContentViewHeight);
    }
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }

  useEffect(handleEventClearContent, []);
  function handleEventClearContent() {
    return ClearContentEditorEvent.on(() => {
      setContentFile('');
    });
  }

  const DELAY_SAVE = 1000;
  const updateFileSystemSync = debounce((value: string) => {
    if (currentFile) {
      window.mochaApi.fileSystem.writeFile(
        getPathFolder(currentFile.path, false),
        currentFile?.name,
        value,
      );
    }
  }, DELAY_SAVE);
  const handleChangeFile = (value: string) => {
    setContentFile(value);
    updateFileSystemSync(value);
  };

  return (
    <div className={styles.container}>
      <CodeEditor
        value={contentFile}
        filename={currentFile?.path}
        height={`${height}px`}
        onChange={handleChangeFile}
      />
    </div>
  );
};

export default Editor;
