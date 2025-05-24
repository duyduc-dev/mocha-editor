import { FC, memo, useMemo } from 'react';
import CodeMirror, {
  EditorView,
  ReactCodeMirrorProps,
} from '@uiw/react-codemirror';
import { codeEditorTheme } from './theme';
import classNames from 'classnames';
import styles from './codeEditor.module.scss';
import { getLanguageProgramming } from './service';
import { color } from '@uiw/codemirror-extensions-color';
import { autocompletion } from '@codemirror/autocomplete';
import { showMinimap } from '@replit/codemirror-minimap';

interface ICodeEditorProps extends ReactCodeMirrorProps {
  containerClassName?: string;
  filename?: string;
}

const create = (v: EditorView) => {
  const dom = document.createElement('div');
  return { dom };
};

const CodeEditor: FC<ICodeEditorProps> = (props) => {
  const { containerClassName, filename } = props;

  const lang = useMemo(
    () => getLanguageProgramming(filename || '') || [],
    [filename],
  );

  return (
    <div className={containerClassName}>
      <CodeMirror
        className={classNames('scrollMain', styles.codeEditor, props.className)}
        width="100%"
        theme={codeEditorTheme}
        {...props}
        extensions={[
          autocompletion(),
          color,
          lang,
          showMinimap.compute(['doc'], () => ({
            create,
            displayText: 'characters',
            showOverlay: 'mouse-over',
          })),
          ...(props.extensions || []),
        ]}
      />
    </div>
  );
};

export default memo(CodeEditor);
