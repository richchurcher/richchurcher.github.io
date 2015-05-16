var Magic = function () {
  this.width = Math.floor(Math.random() * 30) + 10;
  this.height = this.width;
  this.background = "rgb(";
  for (var i = 0; i < 3; i++) {
    this.background += Math.floor(Math.random() * 256).toString();
    this.background += ",";
  }
  this.background = this.background.slice(0, -1);
  this.background += ")";
}

Magic.prototype.getTheMagic = function () {
  return "width:" + this.width + "px;height:" + this.height + "px;background:" + this.background;
}
