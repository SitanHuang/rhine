class Point {
  constructor (row, col) {
    this.row = row;
    this.col = col;
  }

  get x() {
    return this.col;
  }

  get y() {
    return this.row;
  }

  get td() {
    return canvasTable.children[this.row].children[this.col];
  }

  get terrain() {
    return TERRAINS[this.prov.terrain];
  }

  get prov() {
    return MAP_DATA[this.row][this.col];
  }

  adjacents(callback) {
    return iterateAdjacent(this, callback);
  }

  adjacentToPlayer(player) {
    return adjacentToPlayer(this, player)
  }

  adjacentNotToPlayer(player) {
    return adjacentNotToPlayer(this, player);
  }

  get owner() {
    return PLAYERS[this.prov.owner];
  }

  eq(pt) {
    return pt.row == this.row && pt.col == this.col;
  }

  toString() {
    return `(${this.row}, ${this.col})`;
  }
}

function pt(row, col) {
  return new Point(row, col);
}

window.pt = pt;
window.Point = Point;
