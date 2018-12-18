const setupBrowser = () => {
  window.browser = (() => window.browser || window.chrome)();
};

export default setupBrowser;
