colRightClickCallback = td => {
  if (SELECTED_UNITS.length) {
    SELECTED_UNITS.forEach(div => {
      let start = div.loc;
      let end = td.pt;
      if (shiftDown && div.action.length) {
        start = div.action[div.action.length - 1];
        div.action = div.action.concat(unit_pathfind(start, end));
        return;
      }
      div.action = unit_pathfind(start, end);
    });
  }
  repaintCanvas(null, true)
}
