interface IMochaEvent<Args extends any[] = any[]> {
  type: 'event';
  run(event: Electron.IpcMainEvent, ...args: Args): void;
}

interface IpcMainInvoke<Args extends any[] = any[]> {
  type?: 'handler';
  run(event: Electron.IpcMainInvokeEvent, ...args: Args): void;
}

interface IMochaBase {
  name: string;
}

export type IMochaHandler<Args extends any[] = any[]> = IMochaBase &
  (IMochaEvent<Args> | IpcMainInvoke<Args>);
