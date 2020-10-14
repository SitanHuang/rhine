function serializeWorld() {
  PLAYERS.forEach(x => {
    x._mapDataFlattened = false;
  })
  return dojox.json.ref.toJson({
    MAP_DATA: MAP_DATA,
    PLAYERS: PLAYERS,
    timestamp: timestamp
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
  window.timestamp = d.timestamp;
  let date = new Date(timestamp * 1000);
  $date_token.innerText = date.toLocaleDateString("en-US");
  PLAYERS.forEach(x => {
    x.diplomacy = x.diplomacy || {};
    cleanDeserializedObj(x.diplomacy);
    cleanDeserializedObj(x.generals);
  });
  PLAYERS.forEach(x => {
    x.ai = new Ai(x);
  });
}

function cleanDeserializedObj(obj) {
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (prop == '__parent')
      delete obj[prop];
    else if (typeof obj[prop] == 'object')
      cleanDeserializedObj(obj[prop]);
  });
}
