var eventType;

eventType = ('onwheel' in document ? 'onwheel' : 'onmousewheel' in document ? 'onmousewheel' : 'onDOMMouseScroll' in document ? 'onDOMMouseScroll' : 'onMozMousePixelScroll' in document ? 'onMozMousePixelScroll' : void 0);

if (eventType) {
  document.addEventListener(eventType.replace(/on/gim, ''), function(e) {
    var MOUSE_DELTA;
    MOUSE_DELTA = e.deltaY < 0 ? -1 : 1;
    if (MOUSE_DELTA > 0 && DISTANCE_TO_ACTOR < 20) {
      DISTANCE_TO_ACTOR += 1;
    }
    if (MOUSE_DELTA < 0 && DISTANCE_TO_ACTOR > 5) {
      DISTANCE_TO_ACTOR -= 1;
    }
  });
}
