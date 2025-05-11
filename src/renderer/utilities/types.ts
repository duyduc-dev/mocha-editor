export function nameOf<T>(name: Extract<keyof T, string>): string {
  return name;
}
