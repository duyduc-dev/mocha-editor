export const Variables = {
  headerHeight: 32,
  sidebarHeight: 48,
  bottomBarHeight: 32,
  tabTopBarHeight: 42,
  get mainContentSidebarHeight() {
    return window.innerHeight - this.headerHeight - this.bottomBarHeight - 12;
  },
  get mainContentViewHeight() {
    return (
      window.innerHeight -
      this.headerHeight -
      this.bottomBarHeight -
      this.tabTopBarHeight -
      12
    );
  },
};
