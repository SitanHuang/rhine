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
    // from 0.20 to 1.1, mid at 0.7 (mar and sep)
    supplyCx: Math.min(c / 2 + 0.7, 1.1),
    // from 0.13 to 1.4, mid at 0.8 (mar and sep)
    movementCx: Math.min(c / 1.5 + 0.8, 1.5),
    // from 0.90 to 2.1, mid at 0.9 (mar and sep)
    defenseCx: Math.max(-c / 2 + 0.9 + Math.abs(c / 1.5), 0.95) 
  };
}
