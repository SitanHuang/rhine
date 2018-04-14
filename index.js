alert('Google Chrome is recommended for the best experience.');

reinitCanvas();

window.currentPlayerID = -1;
window.currentPlayer = null;

function handlePlayerOnPass() {
  if (!currentPlayer) return;
  let start = new Date().getTime();
  let divs = [];
  for (let row of MAP_DATA) {
    for (let col of row) {
      if (col.owner != currentPlayerID) continue;
      col.supply = 0;
      if (col.terrain != '@'
        && col.divisions.length) {
        currentPlayer.cityList.forEach(p => {
          if (p.eq(col.pt)) col.supply++;
          if (col.supply > 0) return;
          let path = unit_pathfind_friendly_only(col.pt, p).length;
          if (path < 15 && path > 0) {
            col.supply++;
          }
        })
        col.divisions.forEach(div => divs.push(div));
      }
    }
  }
  divs.forEach(div => div.move());
  console.log(`handlePlayerOnPass(): PID=${currentPlayerID} ${new Date().getTime() - start}ms`)
}

function pass() {
  let waiting = document.createElement('waiting');
  waiting.innerHTML = '<h1>Processing</h1>';
  document.body.append(waiting);
  setTimeout(() => {
    handlePlayerOnPass();
    if (++currentPlayerID >= PLAYERS.length) currentPlayerID = 0;
    currentPlayer = PLAYERS[currentPlayerID];
    currentPlayer.calcCities();
    currentPlayer.produce();
    currentPlayer.growManpower();

    // interface
    repaintCanvas();
    updateInterfaceOnPass();
    waiting.remove();
  }, 5);
}

pass();

if (typeof require != 'undefined') {
  alert('Welcome to AncientKingdom: Rhine');
  alert('It is a prototype version. Press 1 - 3 to switch tabs. Press 4 to Pass.');
  alert('Pay attention to every word. Note: there is a right panel too')
  alert('Be sure to click every button on every tab.')
  var ngui = require('nw.gui');
  var nwin = ngui.Window.get();
  nwin.enterFullscreen();
}
