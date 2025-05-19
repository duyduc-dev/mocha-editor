const hasSpace = /\s/;
const hasSeparator = /(_|-|\.|:)/;
const hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
const separatorSplitter = /[\W_]+(.|$)/g;
const camelSplitter = /(.)([A-Z]+)/g;

const IS_UNITLESS_ADD_PX_TO_STYLE: Record<string, boolean> = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
};
const cache = { float: 'cssFloat' };

function unseparate(str: string) {
  return str.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}

function toNoCase(str: string) {
  if (hasSpace.test(str)) return str.toLowerCase();
  if (hasSeparator.test(str)) return (unseparate(str) || str).toLowerCase();
  if (hasCamel.test(str)) return uncamelize(str).toLowerCase();
  return str.toLowerCase();
}

function uncamelize(str: string) {
  return str.replace(camelSplitter, function (m, previous, uppers) {
    return str + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}

function toSpaceCase(str: string) {
  return toNoCase(str)
    .replace(/[\W_]+(.|$)/g, function (matches, match) {
      return match ? ' ' + match : '';
    })
    .trim();
}

function toCamelCase(str: string) {
  return toSpaceCase(str).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}

function addPxToStyle(name: string, value: string | number) {
  if (typeof value === 'number' && !IS_UNITLESS_ADD_PX_TO_STYLE[name]) {
    return value + 'px';
  } else {
    return value;
  }
}

export { toCamelCase, addPxToStyle };
