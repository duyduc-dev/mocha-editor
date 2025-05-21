import { colors } from '@renderer/utilities/colors';
import { draculaInit } from '@uiw/codemirror-theme-dracula';

export const codeEditorTheme = draculaInit({
  settings: {
    background: colors.mainBackground,
    gutterBackground: colors.mainBackground,
  },
});
