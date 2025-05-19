import { addPxToStyle, toCamelCase } from '@renderer/utilities/string';
import { prefixStyle } from '@renderer/utilities/prefixStyle';

type StyleValue = string | number;
type StyleMap = Record<string, StyleValue>;

const cache: Record<string, string | false> = { float: 'cssFloat' };

function style(
  element: HTMLElement,
  property: string,
  value?: StyleValue,
): string | void {
  let camel = cache[property];

  if (typeof camel === 'undefined') {
    camel = detect(property);
  }

  // may be false if unsupported
  if (camel) {
    if (value === undefined) {
      return (element.style as any)[camel];
    }

    (element.style as any)[camel] = addPxToStyle(camel, value);
  }
}

function each(element: HTMLElement, properties: StyleMap): void {
  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      style(element, key, properties[key]);
    }
  }
}

function detect(cssProp: string): string | false {
  const camel = toCamelCase(cssProp);
  const result = prefixStyle(camel) || '';
  cache[camel] = cache[cssProp] = cache[result] = result;
  return result;
}

function set(element: HTMLElement, styles: string): void;
function set(element: HTMLElement, styles: StyleMap): void;
function set(element: HTMLElement, property: string, value: StyleValue): void;
function set(...args: any[]): void {
  if (args.length === 2) {
    if (typeof args[1] === 'string') {
      args[0].style.cssText = args[1];
    } else {
      each(args[0], args[1]);
    }
  } else if (args.length === 3) {
    style(args[0], args[1], args[2]);
  }
}

function get(
  element: HTMLElement,
  properties: string | string[],
): Record<string, string | void> | string | void {
  if (Array.isArray(properties)) {
    return properties.reduce(
      (obj, prop) => {
        obj[prop] = style(element, prop || '');
        return obj;
      },
      {} as Record<string, string | void>,
    );
  } else {
    return style(element, properties || '');
  }
}

export default set;
export { set, get };
