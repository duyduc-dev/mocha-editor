import { BrowserWindow } from 'electron';
interface IMochaEvent<Args extends any[] = any[]> {
  type: 'event';
  run(window: BrowserWindow, event: Electron.IpcMainEvent, ...args: Args): void;
}

interface IpcMainInvoke<Args extends any[] = any[]> {
  type?: 'handler';
  run(
    window: BrowserWindow,
    event: Electron.IpcMainInvokeEvent,
    ...args: Args
  ): void;
}

interface IMochaBase {
  name: string;
}

export type IMochaHandler<Args extends any[] = any[]> = IMochaBase &
  (IMochaEvent<Args> | IpcMainInvoke<Args>);
