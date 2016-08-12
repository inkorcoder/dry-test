var fn, fn1, i, j, len, len1, modelPath, path, substring, textruePath, updateLoader;

substring = function(str) {
  return str.replace(/^.*([\\\/])/, '').replace(/\..{0,10}/, '');
};

updateLoader = function() {
  LOADER.current++;
  MESSAGE.write("LOADING: current: " + LOADER.current + ", total: " + LOADER.total + ", " + (ERRORS_LOG.length !== 0 ? ERRORS_LOG.length + 'error(s)' : 'no errors'));
};

LOADER.total = MODELS_PATHS.length + TEXTURES_PATHS.length;


/*
	models loader
 */

fn = function(path) {
  return LOADER.json.load(MODELS_PATH + path, function(geometry, materials) {
    MODELS[substring(path)] = {
      geometry: geometry,
      materials: materials,
      path: path
    };
    updateLoader();
    if (LOADER.current === LOADER.total) {
      INIT();
      MESSAGE.write('<br>-- START RENDERING --<br>');
    }
  }, (function() {}), function(error) {
    ERRORS_LOG.push(error.currentTarget.responseURL + " :: " + error.currentTarget.status);
    MESSAGE.write('ERROR! #{error.currentTarget.responseURL} :: #{error.currentTarget.status}');
    updateLoader();
  });
};
for (i = 0, len = MODELS_PATHS.length; i < len; i++) {
  modelPath = MODELS_PATHS[i];
  path = modelPath;
  fn(path);
}


/*
	textures loader
 */

fn1 = function(textruePath) {
  return LOADER.texture.load(TEXTURES_PATH + textruePath, function(textrue) {
    TEXTURES[substring(textruePath)] = textrue;
    updateLoader();
    if (LOADER.current === LOADER.total) {
      INIT();
      MESSAGE.write('<br>-- START RENDERING --<br>');
    }
  }, (function() {}), function(error) {
    ERRORS_LOG.push(error.currentTarget.responseURL + " :: " + error.currentTarget.status);
    MESSAGE.write('ERROR! #{error.currentTarget.responseURL} :: #{error.currentTarget.status}');
    updateLoader();
  });
};
for (j = 0, len1 = TEXTURES_PATHS.length; j < len1; j++) {
  textruePath = TEXTURES_PATHS[j];
  fn1(textruePath);
}
