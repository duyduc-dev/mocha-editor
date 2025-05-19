import { FC, useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup } from 'codemirror';

interface Props {
  value: string;
}

const CodeMirror: FC<Props> = (props) => {
  const { value } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const startState = EditorState.create({
        doc: value,
        extensions: [
          keymap.of(defaultKeymap),
          javascript({ jsx: true, typescript: true }),
          lineNumbers({}),
        ],
      });

      let view = new EditorView({
        state: startState,
        parent: ref.current as any,
      });
      view.state.toText(value);
    }
  }, [value]);

  return <div  ref={ref}></div>;
};

export default CodeMirror;
