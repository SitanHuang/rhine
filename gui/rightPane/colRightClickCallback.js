colRightClickCallback = td => {
  if (SELECTED_UNITS.length) {
    if (td.pt.prov.owner == currentPlayerID) buttonsPlayer.playSprite(12 + 45/60, 13 + 8/60);
    else miscPlayer.playSprite(45 + 32/60, 45 + 57/60);
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
