var collision;

collision = function(object) {
  var collisions, i, j, len, r, results;
  colls.right = colls.left = colls.up = colls.down = false;
  results = [];
  for (i = j = 0, len = rays.length; j < len; i = ++j) {
    r = rays[i];
    caster.set(object.position, r);
    collisions = caster.intersectObjects(object);
    if (collisions.length > 0 && collisions[0].distance <= distance) {
      if (i === 0 || i === 1 || i === 7) {
        colls.down = true;
      } else if (i === 3 || i === 4 || i === 5) {
        colls.up = true;
      }
      if (i === 1 || i === 2 || i === 3) {
        results.push(colls.right = true);
      } else if (i === 5 || i === 6 || i === 7) {
        results.push(colls.left = true);
      } else {
        results.push(void 0);
      }
    } else {
      results.push(void 0);
    }
  }
  return results;
};
