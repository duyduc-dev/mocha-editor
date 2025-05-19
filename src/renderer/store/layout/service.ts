export function insertAfter<T>(
  obj: Record<string, T>,
  afterKey: string | null,
  newKey: string,
  newValue: T,
): Record<string, T> {
  const result: Record<string, T> = {};
  let inserted = false;

  for (const [key, value] of Object.entries(obj)) {
    result[key] = value;
    if (key === afterKey) {
      result[newKey] = newValue;
      inserted = true;
    }
  }
  // If afterKey not found, append at the end
  if (!inserted) {
    result[newKey] = newValue;
  }

  return result;
}
