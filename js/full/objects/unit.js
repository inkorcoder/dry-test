var Unit;

Unit = function(model, texture, callback, is_) {
  var action, parseAnimations, play, tex, unit;
  model = window.MODELS[model];
  tex = window.TEXTURES[texture];
  unit = new THREE.SkinnedMesh(model.geometry, new THREE.MeshPhongMaterial({
    skinning: true
  }));
  unit.material.map = window.TEXTURES[texture.map];
  unit.material.normalMap = window.TEXTURES[texture.normalMap];
  unit.geometry.computeVertexNormals();
  unit.geometry.normalsNeedUpdate = true;
  action = {};
  unit.animations = {};
  unit.mixer = new THREE.AnimationMixer(unit);
  parseAnimations = function() {
    var anim, i, len, o;
    o = void 0;
    anim = void 0;
    i = 0;
    len = unit.geometry.animations.length;
    while (i < len) {
      o = unit.geometry.animations[i];
      if (o) {
        anim = unit.mixer.clipAction(o, unit);
        anim.setEffectiveWeight(1);
        unit.animations[o.name] = anim;
      }
      i++;
    }
  };
  parseAnimations();
  play = function(name, _loop) {
    var from, to;
    to = unit.animations[name];
    if (unit.currentAnimation) {
      from = unit.animations[unit.currentAnimation];
      to.reset();
      if (_loop) {
        to.setLoop(THREE.LoopRepeat);
        to.clampWhenFinished = false;
      } else {
        to.setLoop(THREE.LoopOnce, 0);
        to.clampWhenFinished = true;
        unit.mixer.addEventListener('finished', function(e) {
          play('Sprint_01', true);
        });
      }
      from.play();
      to.play();
      from.enabled = true;
      to.enabled = true;
      from.crossFadeTo(to, 0.3);
    } else {
      to.play();
    }
    unit.currentAnimation = name;
  };
  unit.animations['Sprint_01'].play();
  console.log(unit.animations);
  SCENE.add(unit);
  unit.name = 'Unit';
  unit.isMoving = false;
  unit.collidersLength = 1;
  unit.velocity = {
    x: 0,
    z: 0,
    y: 0
  };
  unit.cachedAngle = false;
  unit.distance = 0.5;
  unit.caster = new THREE.Raycaster();
  unit.rays = [new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 0, -1), new THREE.Vector3(0, 0, -1), new THREE.Vector3(-1, 0, -1), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 0, 1)];
  unit.colls = {
    right: false,
    left: false,
    up: false,
    down: false
  };
  unit.updateCollidersPosition = function() {
    var setPosition;
    setPosition = function(collider, type) {
      var offset;
      switch (type) {
        case 'front':
          offset = 0;
          break;
        case 'right':
          offset = Math.PI / 2;
          break;
        case 'rear':
          offset = Math.PI;
          break;
        case 'left':
          offset = (Math.PI / 2) * 3;
      }
      collider.position.x = unit.position.x - Math.sin(unit.rotation.y + offset) * 1;
      collider.position.y = unit.position.y + 2;
      return collider.position.z = unit.position.z - Math.cos(unit.rotation.y + offset) * 1;
    };
    setPosition(unit.colliders.front, 'front');
    setPosition(unit.colliders.rear, 'rear');
    setPosition(unit.colliders.left, 'left');
    setPosition(unit.colliders.right, 'right');
  };
  (unit._generateColliders = function() {
    unit.colliders = {
      front: new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 10, 1), new THREE.MeshNormalMaterial()),
      rear: new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 10, 1), new THREE.MeshNormalMaterial()),
      left: new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 10, 1), new THREE.MeshNormalMaterial()),
      right: new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 10, 1), new THREE.MeshNormalMaterial())
    };
    SCENE.add(unit.colliders.front);
    SCENE.add(unit.colliders.rear);
    SCENE.add(unit.colliders.left);
    SCENE.add(unit.colliders.right);
    unit.updateCollidersPosition();
  })();
  unit.updateVelocity = function(delta) {
    unit.velocity.z -= unit.velocity.z * 10 * delta;
    unit.velocity.x -= unit.velocity.x * 10 * delta;
    unit.velocity.y -= unit.velocity.y * 10 * delta;
    if (Math.abs(unit.velocity.x) < 1) {
      unit.velocity.x = 0;
    }
    if (Math.abs(unit.velocity.z) < 1) {
      unit.velocity.z = 0;
    }
    if (KEYS.w) {
      unit.velocity.z -= 100 * delta;
    }
    if (KEYS.s) {
      unit.velocity.z += 100 * delta;
    }
    if (KEYS.a) {
      unit.velocity.x -= 100 * delta;
    }
    if (KEYS.d) {
      unit.velocity.x += 100 * delta;
    }
    unit.isMoving = !(unit.velocity.x === 0 && unit.velocity.z === 0);
  };
  unit.setRotation = function(vector) {
    var diff, step, steps;
    diff = (vector.y - unit.rotation.y) % (Math.PI * 2);
    steps = 10;
    step = diff / steps;
    if (unit.isMoving) {
      if (diff > 0) {
        if (diff > 0.01) {
          unit.rotation.y += step;
        } else {
          unit.rotation.y = vector.y;
        }
      } else {
        if (diff < -0.01) {
          unit.rotation.y += step;
        } else {
          unit.rotation.y = vector.y;
        }
      }
    }
    unit.updateCollidersPosition();
  };
  unit.updatePosition = function(delta) {
    var controlPosition, controlRotation, x, z;
    controlRotation = CONTROL.getObject().rotation;
    controlPosition = CONTROL.getObject().position;
    unit.updateVelocity(delta);
    x = Math.sin(controlRotation.y) * unit.velocity.x;
    z = Math.cos(controlRotation.y) * unit.velocity.z;
    unit.translateX(unit.velocity.x * delta);
    unit.translateZ(unit.velocity.z * delta);
    return unit.setRotation(controlRotation);
  };
  return unit;
};
