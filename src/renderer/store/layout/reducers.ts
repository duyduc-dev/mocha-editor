import {
  ILayoutState,
  ITabActionPayload,
  TabActionType,
} from '@renderer/store/layout/models';
import { insertAfter } from './service';

export const tabActionReducer = (
  state: ILayoutState,
  action: ITabActionPayload,
) => {
  switch (action.type) {
    case TabActionType.ACTIVE:
      state.currentTab = action.payload;
      return;
    case TabActionType.ADD: {
      const { id } = action.payload;
      if (state.tabBars[id]) {
        state.currentTab = id;
        return;
      }
      state.tabBars = insertAfter(
        state.tabBars,
        state.currentTab,
        id,
        action.payload,
      );
      state.currentTab = id;
      return;
    }
    case TabActionType.CLOSE: {
      const tabIdToClose = action.payload;
      const tabKeys = Object.keys(state.tabBars);

      // If the closed tab is the active one, select a fallback tab
      if (state.currentTab === tabIdToClose) {
        const currentIndex = tabKeys.indexOf(tabIdToClose);

        // Prefer the next tab, otherwise fall back to the previous one
        const fallbackTab =
          tabKeys[currentIndex + 1] || tabKeys[currentIndex - 1] || null;

        state.currentTab = fallbackTab;
      }

      delete state.tabBars[tabIdToClose];
      break;
    }
  }
};
