Object.defineProperty(document, 'visibilityState', {get: function() { return 'visible'; }});
Object.defineProperty(document, 'hidden', {get: function() { return false; }});
Object.defineProperty(document, "hasFocus", {
  value: function() { return true; },
  writable: true,
  configurable: true
});

(function() {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'visibilitychange') {
      const newListener = function(event) {
        Object.defineProperty(document, 'visibilityState', {get: function() { return 'visible'; }});
        Object.defineProperty(document, 'hidden', {get: function() { return false; }});
        listener.apply(this, arguments);
      };
      originalAddEventListener.call(this, type, newListener, options);
    } else {
      originalAddEventListener.call(this, type, listener, options);
    }
  };
})();

console.log('always_visible.js loaded1')