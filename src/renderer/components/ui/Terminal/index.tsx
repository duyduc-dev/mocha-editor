import '@xterm/xterm/css/xterm.css';
import { Terminal as TerminalXterm } from '@xterm/xterm';
import { useRef, useEffect } from 'react';
import { FitAddon } from '@xterm/addon-fit';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<TerminalXterm>(null);
  const fitAddonRef = useRef<FitAddon>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new TerminalXterm({
      cursorBlink: true,
      fontSize: 14,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();
    term.write('Welcome to xterm in React!\r\n');

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        resize: 'both',
        overflow: 'auto',
        height: '100%',
      }}
    />
  );
};

export default Terminal;
