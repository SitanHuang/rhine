// returns a value between -1 and 1 based on global timestamp or argument t
function weather_curve(t) {
  let date = new Date((t || timestamp) * 1000);
  let x = date.getMonth() + date.getDate() / 30;
  return -Math.cos(x / 12 * 2 * Math.PI);
}

// updates global weather attributes, should be called every tick
function weather_update() {
  let c = weather_curve();
  window._weather = {
    // from 0.55 to 1.05, mid at 0.8 (mar and sep)
    supplyCx: (c / 4 + 0.8),
    // from 0.47 to 1.1, mid at 0.8 (mar and sep)
    movementCx: Math.min(c / 3 + 0.8, 1.1),
    // from 0.95 to 1.6, mid at 1.1 (mar and sep)
    defenseCx: Math.max(-c / 2.5 + 1.1 + Math.abs(c / 10), 0.95) 
  };
}
