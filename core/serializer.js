function serializeWorld() {
  PLAYERS.forEach(x => {
    x._mapDataFlattened = false;
  })
  return dojox.json.ref.toJson({
    MAP_DATA: MAP_DATA,
    PLAYERS: PLAYERS
  });
}

function deserializeWorld(s) {
  let d = dojox.json.ref.fromJson(s);
  // p1 = d.p1;
  // p2 = d.p2;
  MAP_DATA = d.MAP_DATA;
  PLAYERS = d.PLAYERS;
  currentPlayer = PLAYERS[currentPlayerID];
  p1 = PLAYERS[1];
  p2 = PLAYERS[0];
  PLAYERS.forEach(x => {
    x.ai = new Ai(x);
  })
}
