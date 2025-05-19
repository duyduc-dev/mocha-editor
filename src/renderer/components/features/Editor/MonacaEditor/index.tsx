import { Editor, EditorProps } from '@monaco-editor/react';
import { FC } from 'react';

interface IMonacoEditorProps extends EditorProps {}

const MonacaEditor: FC<IMonacoEditorProps> = (props) => {
  return <Editor theme={'vs-dark'} {...props} />;
};

export default MonacaEditor;
