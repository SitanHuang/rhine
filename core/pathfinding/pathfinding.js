function unit_pathfind(start, end) {
  var graphWithWeight = new Graph(MAP_DATA.map(row => {
    return row.map(col => {
      let terrain = TERRAINS[col.terrain];
      let w = 0;
      if (end.owner == currentPlayer) {
        if (col.owner != currentPlayerID) {
          w += 5;
          w += col.divisions.length * 2 + 10;
        }
      }
      return 1 / terrain.movement * 2 + 1 + w;
    })
  }));
  let startWithWeight = graphWithWeight.grid[start.row][start.col];
  let endWithWeight = graphWithWeight.grid[end.row][end.col];
  let resultWithWeight = astar.search(graphWithWeight, startWithWeight, endWithWeight);
  return resultWithWeight.map(coor => {
    return pt(coor.x, coor.y)
  });
}

function unit_pathfind_friendly_only(start, end) {
  var graphWithWeight = new Graph(MAP_DATA.map(row => {
    return row.map(col => {
      return col.owner == currentPlayerID ? 1 : 0;
    })
  }));
  let startWithWeight = graphWithWeight.grid[start.row][start.col];
  let endWithWeight = graphWithWeight.grid[end.row][end.col];
  let resultWithWeight = astar.search(graphWithWeight, startWithWeight, endWithWeight);
  return resultWithWeight.map(coor => {
    return pt(coor.x, coor.y)
  });
}
