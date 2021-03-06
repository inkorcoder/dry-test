var onWindowResize;

onWindowResize = function() {
  CAMERA.aspect = window.innerWidth / window.innerHeight;
  CAMERA.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize, false);
