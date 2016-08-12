var INIT, clock, pointLightHelper, sphere, stats;

RENDERER.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(RENDERER.domElement);

SCENE.add(AMBIENT);

SCENE.add(SUN);

SUN.position.x = -38 * 5;

SUN.position.z = 90 * 5;

SUN.position.y = 76 * 5;

pointLightHelper = new THREE.PointLightHelper(SUN, 100);

SCENE.add(pointLightHelper);

sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10, 1), new THREE.MeshNormalMaterial());

sphere.position.x = SUN.position.x;

sphere.position.y = SUN.position.y;

sphere.position.z = SUN.position.z;

clock = new THREE.Clock();

stats = new Stats();

INIT = function() {
  var ACTOR, CONTROL, a, front, i, j, tLoader, vec;
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  ACTOR = window.ACTOR = new Unit('woman', {
    map: 'Cloth_Diffuse',
    normalMap: 'Cloth_Normal'
  }, function() {
    return console.log(ACTOR);
  });
  CONTROL = window.CONTROL = new THREE.PointerLockControls(CAMERA);
  CONTROL.attachTo(ACTOR);
  SCENE.add(CONTROL.getObject());
  SCENE.add(new THREE.AxisHelper(10));
  tLoader = new THREE.TextureLoader();
  tLoader.load('textures/desert.jpg', function(texture) {
    var material, plane;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);
    material = new THREE.MeshPhongMaterial({
      map: texture
    });
    plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1000), material);
    plane.rotation.x = -Math.PI / 2;
    SCENE.add(plane);
  });
  SCENE.add(new Skybox('fog'));
  window.objs = [];
  for (i = j = -50; j < 50; i = ++j) {
    a = new Unit('woman', {
      map: 'Cloth_Diffuse',
      normalMap: 'Cloth_Normal'
    });
    a.position.x = Math.random() * i * 10;
    a.position.z = Math.random() * i * 10;
    window.objs.push(a);
    SCENE.add(a);
  }
  front = 0;
  vec = new THREE.Vector3(CAMERA.position.x, CAMERA.position.y, CAMERA.position.z);
  RENDER();
};
