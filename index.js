alert('Google Chrome is recommended for the best experience.');

reinitCanvas();

window.currentPlayerID = -1;
window.currentPlayer = null;

window.timestamp = -1025049600; // 7/9/1937
window.timeIncrement = 518400; // 6 days

var $date_token = document.createElement('strong');

$('controls').append($date_token);

let _dateTempI = 0;

function incrementAndUpdateDate() {
  if (_dateTempI++ % 2 == 0) {
    timestamp += timeIncrement + (Math.random() * 86400 * 5).round();
  }
  let date = new Date(timestamp * 1000);
  $date_token.innerText = date.toLocaleDateString("en-US");
}

function setAIFor(i, btn) {
  btn.className = btn.className.length ? '' : 'active';
  PLAYERS[i].setAI = !PLAYERS[i].setAI;
}

let playerSelection = document.createElement('waiting');
let innerHTML = '<h1>Select players</h1><table style="width:70%;margin: auto;">';
PLAYERS.forEach((p, i) => {
  innerHTML += `
  <tr>
  <th>Player ${i}
  <td style="background: ${p.color.replace('0.2', '1')}">&nbsp;
  <td><button onclick='setAIFor(${i}, this)'>set AI</button>
  `;
})
playerSelection.innerHTML += innerHTML + '</table>' +
  `<br><br><button onclick="playerSelection.remove();if (currentPlayer.setAI) pass()">Start Game</button>`;
document.body.append(playerSelection);

let aiThinkButton = document.createElement('button');
aiThinkButton.onclick = () => {
  currentPlayer.ai.think();
  pass();
};
aiThinkButton.style.width = 'auto';
aiThinkButton.style.float = 'right';
aiThinkButton.innerText = 'AI think';
$('controls').append(aiThinkButton);

function handlePlayerOnPass() {
  if (!currentPlayer) return;
  let start = new Date().getTime();
  let divs = [];
  for (let row of MAP_DATA) {
    for (let col of row) {
      if (col.owner != currentPlayerID) continue;
      col.supply = 0;
      if (col.terrain != '@' &&
        col.divisions.length) {
        currentPlayer.cityList.forEach(p => {
          if (p.eq(col.pt)) col.supply++;
          if (col.supply > 0) return;
          let path = unit_pathfind_friendly_only(col.pt, p).length;
          if (path < 15 && path > 0) {
            col.supply++;
          }
        })
        col.divisions.forEach(div => {
          div.airStriked = false;
          divs.push(div)
        });
      }
    }
  }
  divs.forEach(div => div.move());
  console.log(`handlePlayerOnPass(): PID=${currentPlayerID} ${new Date().getTime() - start}ms`)
}

let waiting = document.createElement('waiting');
waiting.innerHTML = '<h1>Processing</h1>';

function pass() {
  document.body.append(waiting);
  setTimeout(() => {
    handlePlayerOnPass();
    incrementAndUpdateDate();
    if (++currentPlayerID >= PLAYERS.length) currentPlayerID = 0;
    currentPlayer = PLAYERS[currentPlayerID];
    currentPlayer.calcCities();
    currentPlayer.produce();
    currentPlayer.growManpower();
    if (currentPlayer.setAI) {
      setTimeout(() => {
        currentPlayer.ai.think();
        waiting.remove();
        setTimeout(() => {
          pass()
        }, 50)
      }, 50)
      return;
    }

    // interface
    repaintCanvas();
    updateInterfaceOnPass();
    waiting.remove();
  }, 50);
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
