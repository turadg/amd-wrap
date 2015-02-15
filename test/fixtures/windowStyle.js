;(function(wndw) {

  if (typeof define === 'function' && define.amd) {
    define([
      'js/vendor/SomeModule',
      ],
    function(Dependency) {
      return SomeModule(Dependency);
    });
  } else if (typeof wndw !== 'undefined' && typeof ender === 'undefined') {
    return wndw.SomeModule = SomeModule(wndw.Dependency);
  }

})(window);
