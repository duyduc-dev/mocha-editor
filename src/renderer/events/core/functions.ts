export const EventCore = {
  dispatch: <T = any>(key: string, data: T) => {
    window.dispatchEvent(new CustomEvent(key, { detail: data }));
  },
  on: <T = any>(key: string, callback: (data: T) => void) => {
    window.addEventListener(key, ({ detail }: any) => callback(detail));
    return function off() {
      EventCore.off(key, callback);
    };
  },
  off: (key: string, handler: any) => {
    window.removeEventListener(key, handler);
  },
};
