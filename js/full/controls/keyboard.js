document.addEventListener('keydown', function(e) {
  var ev;
  ev = e.code.toLowerCase().replace(/(Key|Arrow)/gim, '');
  return KEYS[ev] = true;
});

document.addEventListener('keyup', function(e) {
  var ev;
  ev = e.code.toLowerCase().replace(/(Key|Arrow)/gim, '');
  KEYS[ev] = false;
  return MESSAGE.write("KEYUP: " + ev);
});
