class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
   getArea(cb){
    return cb(null, this.calcArea());
  }

  calcArea(cb) {
    return cb(null, this.height * this.width);
  }
}

module.exports = Rectangle;