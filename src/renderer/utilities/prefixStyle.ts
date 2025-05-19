let div: HTMLDivElement | null = null;
const prefixes = ['Webkit', 'Moz', 'O', 'ms'];

export function prefixStyle(prop: string) {
  if (!div) {
    div = document.createElement('div');
  }
  const style = div.style;
  if (prop in style) {
    return prop;
  }
  const titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (let i = prefixes.length; i >= 0; i--) {
    const name = prefixes[i] + titleCase;
    if (name in style) {
      return name;
    }
  }
  return null;
}
