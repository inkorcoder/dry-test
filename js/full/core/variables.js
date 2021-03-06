var ACTOR_CAMERA_ANGLE, AMBIENT, CAMERA, DISTANCE_TO_ACTOR, ERRORS_LOG, KEYS, LOADER, MATERIAL, MESSAGE, MODELS, MODELS_PATH, MODELS_PATHS, MOUSE_DELTA, POINTER_ROTATION, RENDERER, SCENE, SKYBOX, SUN, TEXTURES, TEXTURES_PATH, TEXTURES_PATHS;

MOUSE_DELTA = 0;

DISTANCE_TO_ACTOR = 10;

AMBIENT = new THREE.AmbientLight(0x150E02);

SUN = new THREE.PointLight(0xF1B457, 1, 10000);

KEYS = {};

ACTOR_CAMERA_ANGLE = .2;

POINTER_ROTATION = {
  x: 0,
  y: 0
};

MESSAGE = {
  node: document.body.getElementsByClassName('message-box')[0],
  write: function(html) {
    this.node.innerHTML = this.node.innerHTML + "<br>" + html;
    return this.node.scrollTop = this.node.scrollHeight;
  }
};

LOADER = {
  json: new THREE.JSONLoader(),
  texture: new THREE.TextureLoader(),
  status: '',
  current: 0,
  total: 0
};

MODELS_PATH = 'models/';

TEXTURES_PATH = 'textures/';

MODELS_PATHS = ['woman.json'];

TEXTURES_PATHS = ['desert.jpg', 'human/woman/Body_Diffuse.png', 'human/woman/Body_Roughness.png', 'human/woman/Cloth_Metallic.png', 'human/woman/Cloth_Roughness.png', 'human/woman/Body_Normal.png', 'human/woman/Cloth_Diffuse.png', 'human/woman/Cloth_Normal.png'];

MODELS = {};

TEXTURES = {};

ERRORS_LOG = [];

SCENE = new THREE.Scene();

CAMERA = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

RENDERER = new THREE.WebGLRenderer();

SKYBOX = void 0;

MATERIAL = new THREE.MeshPhongMaterial();
