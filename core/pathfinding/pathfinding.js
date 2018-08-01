function unit_pathfind(start, end) {
  window.defaultGraphWithWeight = defaultGraphWithWeight || new Graph(MAP_DATA.map(row => {
    return row.map(col => {
      let terrain = TERRAINS[col.terrain];
      let w = 0;
      if (end == currentPlayer) {
        if (col.owner != currentPlayerID) {
          w += 5;
          w += col.divisions.length * 2 + 10;
        }
      }
      if (col.terrain == '@')
        return 0;
      return 1 / terrain.movement * 2 + 1 + w;
    })
  }));
  let startWithWeight = defaultGraphWithWeight.grid[start.row][start.col];
  let endWithWeight = defaultGraphWithWeight.grid[end.row][end.col];
  let resultWithWeight = astar.search(defaultGraphWithWeight, startWithWeight, endWithWeight);
  return resultWithWeight.map(coor => {
    return pt(coor.x, coor.y)
  });
}

function unit_pathfind_friendly_only(start, end) {
  window.graphWithWeight = graphWithWeight || new Graph(MAP_DATA.map(row => {
    return row.map(col => {
      return col.owner == currentPlayerID ? (col.terrain == '@' ? 0 : 1) : 0;
    })
  }));
  let startWithWeight = graphWithWeight.grid[start.row][start.col];
  let endWithWeight = graphWithWeight.grid[end.row][end.col];
  let resultWithWeight = astar.search(graphWithWeight, startWithWeight, endWithWeight);
  return resultWithWeight.map(coor => {
    return pt(coor.x, coor.y)
  });
}
