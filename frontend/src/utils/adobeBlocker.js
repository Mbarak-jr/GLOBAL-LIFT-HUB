export function blockAdobeScripts() {
  // Neutralize storage
  window.dcLocalStorage = {
    getWithTTL: () => null,
    setWithTTL: () => console.debug('Adobe storage call blocked'),
    removeItem: () => {}
  };

  // Block script injection
  const originalImport = window.import;
  window.import = function(url) {
    if (url.includes('adobe') || url.includes('express-fte')) {
      console.warn('Blocked Adobe script:', url);
      return Promise.resolve({ default: {} });
    }
    return originalImport?.(url) || Promise.reject();
  };

  // Disable coachmark
  window.ActionableCoachmark = class {
    constructor() {
      console.warn('Adobe Coachmark disabled');
    }
    render() {}
  };
}