import {
  ILayoutState,
  ITabActionPayload,
  ITabBarLayout,
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
      state.tabBars = insertAfter<ITabBarLayout>(
        state.tabBars,
        state.currentTab,
        id,
        {
          ...action.payload,
          saved: true,
          value: null,
        },
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
        state.currentTab = fallbackTab?.trim?.() || null;
      }
      delete state.tabBars[tabIdToClose];
      return;
    }
    case TabActionType.SET_CONTENT_VALUE: {
      if (state.tabBars[action.payload.id]) {
        state.tabBars[action.payload.id].value = action.payload.value;
        state.tabBars[action.payload.id].saved = action.payload.saved ?? false;
      }
      return;
    }
    case TabActionType.SAVED_FILE: {
      if (state.tabBars[action.payload.id]) {
        state.tabBars[action.payload.id].saved = action.payload.saved ?? false;
      }
      return;
    }
  }
};
