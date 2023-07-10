const LocalStorageService = (function () {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    window.localStorage.setItem("AccessToken", tokenObj.AccessToken);
    window.localStorage.setItem("RefreshToken", tokenObj.RefreshToken);
  }
  function _getAccessToken() {
    return window.localStorage.getItem("AccessToken");
  }
  function _getRefreshToken() {
    return window.localStorage.getItem("RefreshToken");
  }
  function _clearToken() {
    window.localStorage.removeItem("AccessToken");
    window.localStorage.removeItem("RefreshToken");
  }

  function _getStore() {
    return window.localStorage.getItem("store");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    getStore: _getStore,
  };
})();

export default LocalStorageService;
