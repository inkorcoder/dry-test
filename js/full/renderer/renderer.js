var RENDER, prevTime;

prevTime = performance.now();

RENDER = function() {
  var _delta, delta, i, len, o, ref, time;
  stats.begin();
  requestAnimationFrame(RENDER);
  RENDERER.render(SCENE, CAMERA);
  time = performance.now();
  delta = (time - prevTime) / 1000;
  ACTOR.updatePosition(delta);
  _delta = clock.getDelta();
  ACTOR.mixer.update(_delta);
  ref = window.objs;
  for (i = 0, len = ref.length; i < len; i++) {
    o = ref[i];
    o.mixer.update(_delta);
  }
  CONTROL.update();
  prevTime = time;
  stats.end();
};
