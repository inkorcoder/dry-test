var objectsGrid;

objectsGrid = function(rows, cols, step) {
  var a, col, i, j, ref, ref1, row, total, x, z;
  step = step || 1;
  total = 0;
  x = -(rows * step) / 2;
  z = -(cols * step) / 2;
  for (row = i = 0, ref = rows; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
    for (col = j = 0, ref1 = cols; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
      a = new Unit('woman', {
        map: 'Cloth_Diffuse',
        normalMap: 'Cloth_Normal'
      });
      a.position.x = x;
      a.position.z = z;
      total += a.geometry.vertices.length;
      x += step;
    }
    z += step;
    x = -(rows * step) / 2;
  }
  console.log(total);
};
