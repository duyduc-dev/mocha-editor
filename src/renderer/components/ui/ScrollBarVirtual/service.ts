import domCss from '@renderer/utilities/domCss';

let scrollbarWidth: number | false = false;

export function getScrollbarWidth() {
  if (scrollbarWidth !== false) return scrollbarWidth;
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    domCss(div, {
      width: 100,
      height: 100,
      position: 'absolute',
      top: -9999,
      overflow: 'scroll',
      MsOverflowStyle: 'scrollbar',
    });
    document.body.appendChild(div);
    scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  } else {
    scrollbarWidth = 0;
  }
  return scrollbarWidth || 0;
}

export function getInnerHeight(el: HTMLElement) {
  const { clientHeight } = el;
  const { paddingTop, paddingBottom } = getComputedStyle(el);
  return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}

export function getInnerWidth(el: HTMLElement) {
  const { clientWidth } = el;
  const { paddingLeft, paddingRight } = getComputedStyle(el);
  return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}

export function isString(str: any) {
  return typeof str === 'string' || str instanceof String;
}
