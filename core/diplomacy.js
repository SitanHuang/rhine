function diplomacy_check() {
  let pids = PLAYERS.map(x => x.playerID);
  PLAYERS.forEach(p => {
    p.diplomacy = p.diplomacy || {};
    pids.forEach(pid => {
      if (pid == p.playerID) return;
      let dip = p.diplomacy[pid] || {status: 'WAR'};
      if (window.timestamp >= dip.changeAfter) {
        dip = PLAYERS[pid].diplomacy[p.playerID] = dip.changeValue;
      }
      p.diplomacy[pid] = dip;
    });
  });
}

function diplomacy_change(pid1, pid2, dipObj) {
  PLAYERS[pid1].diplomacy[pid2] = PLAYERS[pid2].diplomacy[pid1] = dipObj;
  diplomacy_check();
}

function diplomacy_get(pid1, pid2) {
  return PLAYERS[pid1].diplomacy[pid2];
}
