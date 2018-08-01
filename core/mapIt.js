function factoriesInProv(prov) {
  return prov.slots.filter(x => (x == 'F')).length;
}

function getOrReturn(pt, callback) {
  let col = null;
  if (MAP_DATA[pt.row] && (col = MAP_DATA[pt.row][pt.col])) {
    if (col.terrain == '@') return;
    if (callback) callback(pt);
  }
}

function iterateAdjacent(p, callback) {
  [
    () => {getOrReturn(pt(p.row - 1, p.col), callback);},
    () => {getOrReturn(pt(p.row + 1, p.col), callback);},
    () => {getOrReturn(pt(p.row, p.col + 1), callback);},
    () => {getOrReturn(pt(p.row, p.col - 1), callback);}
  ].sort(() => (Math.random() - 0.5)).forEach(x => x())
}

function adjacentToPlayer(pt, player) {
  let yes = 0;
  pt.adjacents(p => {
    if (p.prov.owner == player.playerID) yes++;
  })
  return yes == 0 ? false : yes;
}

function adjacentNotToPlayerUnits(pt, player) {
  let yes = 0;
  pt.adjacents(p => {
    if (p.prov.owner != player.playerID) yes += p.prov.divisions.length;
  })
  return yes == 0 ? false : yes;
}

function adjacentNotToPlayer(pt, player) {
  let yes = 0;
  pt.adjacents(p => {
    if (p.owner != player) yes++;
  })
  return yes == 0 ? false : yes;
}
