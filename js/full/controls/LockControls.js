var element, havePointerLock, pointerlockchange;

havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {
  element = document.body;
  pointerlockchange = function(event) {
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      CONTROL.enabled = true;
    } else {
      CONTROL.enabled = false;
    }
  };
  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
  element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
  element.addEventListener('click', function() {
    var fullscreenchange;
    if (/Firefox/i.test(navigator.userAgent)) {
      fullscreenchange = function(event) {
        if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
          document.removeEventListener('fullscreenchange', fullscreenchange);
          document.removeEventListener('mozfullscreenchange', fullscreenchange);
        }
      };
      document.addEventListener('fullscreenchange', fullscreenchange, false);
      document.addEventListener('mozfullscreenchange', fullscreenchange, false);
      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
      element.requestFullscreen();
      element.requestPointerLock();
    } else {
      element.requestPointerLock();
    }
  });
} else {
  alert('Your browser doesn\'t seem to support Pointer Lock API');
}

THREE.PointerLockControls = function(camera) {
  var PI_2, onMouseMove, pitchObject, scope, yawObject;
  scope = this;
  this.object = null;
  this.bbox = null;
  scope.rotation = {
    x: 0,
    y: 0
  };
  PI_2 = Math.PI / 2;
  camera.rotation.set(0, 0, 0);
  pitchObject = new THREE.Object3D();
  pitchObject.add(camera);
  yawObject = new THREE.Object3D();
  yawObject.position.y = 2.5;
  yawObject.add(pitchObject);
  onMouseMove = function(event) {
    if (scope.enabled === false) {
      return;
    }
    POINTER_ROTATION.x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    POINTER_ROTATION.y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  };
  this.update = function() {
    yawObject.rotation.y -= POINTER_ROTATION.x * 0.01;
    pitchObject.rotation.x -= POINTER_ROTATION.y * 0.01;
    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
    POINTER_ROTATION.x = 0;
    POINTER_ROTATION.y = 0;
    if (this.object) {
      if (!this.bbox) {
        this.object.geometry.computeBoundingBox();
        this.bbox = this.object.geometry.boundingBox;
      }
      yawObject.position.x = this.object.position.x - Math.sin(yawObject.rotation.y + ACTOR_CAMERA_ANGLE) * -DISTANCE_TO_ACTOR;
      yawObject.position.z = this.object.position.z - Math.cos(yawObject.rotation.y + ACTOR_CAMERA_ANGLE) * -DISTANCE_TO_ACTOR;
      yawObject.position.y = this.object.position.y + (this.bbox.max.y || 0);
    }
  };
  this.attachTo = function(object) {
    this.object = object;
  };
  this.detach = function() {
    this.object = null;
  };
  this.dispose = function() {
    document.removeEventListener('mousemove', onMouseMove, false);
  };
  document.addEventListener('mousemove', onMouseMove, false);
  this.enabled = false;
  this.getObject = function() {
    return yawObject;
  };
};
