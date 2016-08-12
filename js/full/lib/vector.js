
/*
	vector constructor
 */
var vector;

vector = {
  _x: 0,
  _y: 0,
  create: function(x, y) {
    var obj;
    obj = Object.create(this);
    obj.setX(x);
    obj.setY(y);
    return obj;
  },
  setX: function(value) {
    this._x = value;
  },
  setY: function(value) {
    this._y = value;
  },
  getX: function(value) {
    return this._x;
  },
  getY: function(value) {
    return this._y;
  },
  setAngle: function(angle) {
    var length;
    length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },
  getAngle: function() {
    return Math.atan2(this._y, this._x);
  },
  setLength: function(length) {
    var angle;
    angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },
  getLength: function() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  },
  add: function(v2) {
    return vector.create(this._x + v2.getX(), this._y + v2.getY());
  },
  substract: function(v2) {
    return vector.create(this._x - v2.getX(), this._y - v2.getY());
  },
  multiply: function(val) {
    return vector.create(this._x * val, this._y * val);
  },
  divide: function(val) {
    return vector.create(this._x / val, this._y / val);
  },
  addTo: function(v2) {
    this._x += v2.getX();
    return this._y += v2.getY();
  },
  substractFrom: function(v2) {
    this._x -= v2.getX();
    return this._y -= v2.getY();
  },
  multiplyBy: function(val) {
    this._x *= val;
    return this._y *= val;
  },
  divideBy: function(val) {
    this._x /= val;
    return this._y /= val;
  }
};
