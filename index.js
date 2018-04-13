alert('Google Chrome is recommended for the best experience.');

reinitCanvas();

window.currentPlayerID = -1;
window.currentPlayer = null;

function handlePlayerOnPass() {
  if (!currentPlayer) return;
  console.log(`handlePlayerOnPass(): PID=${currentPlayerID}`)
  let divs = [];
  for (let row of MAP_DATA) {
    for (let col of row) {
      if (col.owner == currentPlayerID) {
        col.divisions.forEach(div => divs.push(div))
      }
    }
  }
  divs.forEach(div => div.move())
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
