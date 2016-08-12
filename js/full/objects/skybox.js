var Skybox;

Skybox = function(path) {
  var material, shader, skybox, textureCube, urls;
  if (SKYBOX) {
    SCENE.remove(SKYBOX);
  }
  path = "textures/skyboxes/" + path + '/';
  urls = [path + "posx.jpg", path + "negx.jpg", path + "posy.jpg", path + "negy.jpg", path + "posz.jpg", path + "negz.jpg"];
  textureCube = new THREE.CubeTextureLoader().load(urls);
  shader = THREE.ShaderLib["cube"];
  shader.format = THREE.RGBFormat;
  shader.uniforms["tCube"].value = textureCube;
  material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide,
    needsUpdate: true
  });
  skybox = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1), material);
  return skybox;
};
