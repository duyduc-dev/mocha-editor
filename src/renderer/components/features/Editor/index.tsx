import CodeEditor from '@renderer/components/ui/CodeEditor';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { selectCurrentTab } from '@renderer/store/layout/selector';
import { useEffect, useState } from 'react';
import { Variables } from '@renderer/utilities/variable';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType } from '@renderer/store/layout/models';
import useFilesOpeningHandler from '@renderer/components/hooks/useFilesOpeningHandler';

const Editor = () => {
  const currentTab = useAppSelector(selectCurrentTab);
  const dispatch = useAppDispatch();
  const [height, setHeight] = useState(Variables.mainContentViewHeight);

  const setTempContentFile = (value: string | null, saved?: boolean) => {
    if (!currentTab) return;
    dispatch(
      setTabAction({
        type: TabActionType.SET_CONTENT_VALUE,
        payload: {
          id: currentTab.id,
          value: value,
          saved,
        },
      }),
    );
  };

  useFilesOpeningHandler();

  useEffect(handleReadFile, [currentTab]);
  function handleReadFile() {
    if (currentTab && currentTab.value === null)
      window.mochaApi.fileSystem.readFile(currentTab.path).then((content) => {
        setTempContentFile(content, true);
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

  const handleChangeFile = (value: string) => {
    setTempContentFile(value);
  };

  return (
    <div className={styles.container}>
      <CodeEditor
        value={currentTab?.value || ''}
        filename={currentTab?.path}
        height={`${height}px`}
        onChange={handleChangeFile}
      />
    </div>
  );
};

export default Editor;
