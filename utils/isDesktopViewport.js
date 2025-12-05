export const isDesktopViewport = (page) => {
  // return true or false
  const size = page.viewportSize();
  return size.width >= 640;
};
