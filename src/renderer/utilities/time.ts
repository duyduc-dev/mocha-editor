export function createSleep(ms: number) {
  let timeoutId: NodeJS.Timeout;
  const sleep = new Promise<void>((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });

  return {
    sleep,
    cancelSleep: () => clearTimeout(timeoutId!),
  };
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
