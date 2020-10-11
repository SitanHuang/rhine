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
    // from 0.7 to 1.1, mid at 0.9 (mar and sep)
    supplyCx: (c / 5 + 0.9),
    // from 0.47 to 1.1, mid at 0.8 (mar and sep)
    movementCx: Math.min(c / 3 + 0.8, 1.1),
    // from 1 to 1.4, mid at 1.2 (mar and sep)
    defenseCx: (-c / 5 + 1.2) 
  };
}
