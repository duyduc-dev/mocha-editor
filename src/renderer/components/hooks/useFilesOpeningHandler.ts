import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import { selectTabBars } from '@renderer/store/layout/selector';
import { useEffect } from 'react';
import { getPathFolder } from '@renderer/utilities/files';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType } from '@renderer/store/layout/models';

const useHandleSaveFileOnBlurWindow = () => {
  const tabBars = useAppSelector(selectTabBars);
  const dispatch = useAppDispatch();

  useEffect(handleEventForSaveOnBlurWindow, [tabBars]);
  function handleSaveOnBlurWindow() {
    Object.values(tabBars).forEach((tab) => {
      if (!tab.saved) {
        window.mochaApi.fileSystem
          .writeFile(getPathFolder(tab.path, false), tab.name, tab.value || '')
          .then(
            () => {
              console.log(`[${tab.name} saved]`);
              dispatch(
                setTabAction({
                  type: TabActionType.SAVED_FILE,
                  payload: {
                    id: tab.id,
                    saved: true,
                  },
                }),
              );
            },
            (reason) => {
              console.log(`[${tab.name} not saved]`, reason);
            },
          );
      }
    });
  }
  function handleEventForSaveOnBlurWindow() {
    return window.mochaApi.onMessage('blur-window', handleSaveOnBlurWindow);
  }
};

const useLoadFilesOpeningOnFocusWindow = () => {
  const tabBars = useAppSelector(selectTabBars);
  const dispatch = useAppDispatch();

  useEffect(handleEventForLoadFilesOpeningOnFocusWindow, [tabBars]);
  function handleLoadFilesOpeningOnFocusWindow() {
    Object.values(tabBars).forEach((tab) => {
      window.mochaApi.fileSystem.readFile(tab.path).then((content) => {
        dispatch(
          setTabAction({
            type: TabActionType.SET_CONTENT_VALUE,
            payload: {
              id: tab.id,
              value: content,
              saved: true,
            },
          }),
        );
      });
    });
  }
  function handleEventForLoadFilesOpeningOnFocusWindow() {
    return window.mochaApi.onMessage(
      'focus-window',
      handleLoadFilesOpeningOnFocusWindow,
    );
  }
};

const useFilesOpeningHandler = () => {
  useHandleSaveFileOnBlurWindow();
  useLoadFilesOpeningOnFocusWindow();
};

export default useFilesOpeningHandler;
