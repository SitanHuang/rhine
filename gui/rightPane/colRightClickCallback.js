colRightClickCallback = td => {
  if (SELECTED_UNITS.length) {
    SELECTED_UNITS.forEach(div => {
      let start = div.loc;
      let end = td.pt;
      div.action = unit_pathfind(start, end);
    });
  }
  repaintCanvas()
}
