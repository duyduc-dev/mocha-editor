import { useAppDispatch, useAppSelector } from '@renderer/store/common';
import {
  selectCurrentTab,
  selectTabBars,
} from '@renderer/store/layout/selector';
import { useEffect } from 'react';
import { getPathFolder } from '@renderer/utilities/files';
import { setTabAction } from '@renderer/store/layout/slice';
import { TabActionType } from '@renderer/store/layout/models';
import { useKeyPressHandler } from 'hooks-react-custom';

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

const useSaveFileHandler = () => {
  const currentTab = useAppSelector(selectCurrentTab);
  const dispatch = useAppDispatch();

  const saveCurrentFile = async () => {
    if (currentTab && !currentTab.saved) {
      try {
        window.mochaApi.fileSystem.writeFile(
          getPathFolder(currentTab.path, false),
          currentTab.name,
          currentTab.value || '',
        );
        console.log(`[${currentTab.name} saved]`);
        dispatch(
          setTabAction({
            type: TabActionType.SAVED_FILE,
            payload: {
              id: currentTab.id,
              saved: true,
            },
          }),
        );
      } catch (error) {
        console.log(`[${currentTab.name} not saved]`, error);
      }
    }
  };

  const readCurrentFile = () =>
    currentTab &&
    window.mochaApi.fileSystem.readFile(currentTab.path).then((content) => {
      dispatch(
        setTabAction({
          type: TabActionType.SET_CONTENT_VALUE,
          payload: {
            id: currentTab.id,
            value: content,
            saved: true,
          },
        }),
      );
    });

  useKeyPressHandler('ctrl.s', async () => {
    saveCurrentFile().then(readCurrentFile);
  });
};

const useFilesOpeningHandler = () => {
  useHandleSaveFileOnBlurWindow();
  useLoadFilesOpeningOnFocusWindow();
  useSaveFileHandler();
};

export default useFilesOpeningHandler;
