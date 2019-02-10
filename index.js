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
  if (_dateTempI++ % 3 == 0) {
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

function openSavedFile(file) {
  deserializeWorld(localStorage[file]);
  repaintCanvas();
  updateInterfaceOnPass();
  playerSelection.remove();
}

function deleteSavedFile(file) {
  delete localStorage[file];
  playerSelectionScreen();
}

function playerSelectionScreen() {
  playerSelection.remove();
  playerSelection = document.createElement('waiting');
  let innerHTML = '<h1>Select players</h1><table style="width:70%;margin: auto;">';
  PLAYERS.forEach((p, i) => {
    innerHTML += `
    <tr>
    <th>Player ${i}
    <td style="background: ${p.color.replace('0.2', '1')}">&nbsp;
    <td><button onclick='setAIFor(${i}, this)'>set AI</button>
    `;
  })
  innerHTML += '</table>' +
  `<br><br><button onclick="playerSelection.remove();if (currentPlayer.setAI) pass()">Start Game</button>
  <br><br><table style="width:77%">
  `;
  Object.entries(localStorage).forEach((e) => {
    let k = e[0];
    let v = e[1];
    if (k.indexOf('file_') == 0) {
      let kk = k.replace('file_', '');
      innerHTML += `<tr><th>${escapeHtml(kk)}<td width=1><button onclick="openSavedFile(${escapeHtml(JSON.stringify(k))})">Open</button><td width=1><button onclick="deleteSavedFile(${escapeHtml(JSON.stringify(k))})">Delete</button>`;
    }
  });
  playerSelection.innerHTML += innerHTML + '</table>';
  document.body.append(playerSelection);
}

playerSelectionScreen();


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
      if (col.terrain != '@' &&
        col.divisions.length && (col.supply == 0 || Math.random() > 0.5)) {
        col.supply = 0;
        currentPlayer.cityList.forEach(p => {
          if (p.eq(col.pt)) col.supply = (col.supply + 1).max(1);
          //if (col.supply > 0) return;
          let path = unit_pathfind_friendly_only(col.pt, p).length;
          if (path < 15 && path > 0) {
            //col.supply++;
            col.supply = Math.max(col.supply, (1 - (path / 15) * col.pt.terrain.movement * 1.2).round(2)).min(0).max(1);
          }
        });
        currentPlayer.ports.forEach(p => {
          if (p.eq(col.pt)) col.supply = (col.supply + 1).max(1);
          //if (col.supply > 0) return;
          let path = unit_pathfind_friendly_only(col.pt, p).length;
          if (path < 15 && path > 0) {
            //col.supply++;
            col.supply = Math.max(col.supply, (1 - (path / 15) * col.pt.terrain.movement).round(2)).min(0).max(1);
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

let _passInterval = -1;

function pass() {
  if (PLAYERS.filter(x => (!x.setAI)).length == 0 && _passInterval == -1) {
    waiting.style.display = 'none';
    currentPlayer.setAI = false;
    _passInterval = setInterval(() => {currentPlayer.ai.think(); pass()}, 1500);
    return;
  }
  document.body.append(waiting);
  setTimeout(() => {
    handlePlayerOnPass();
    incrementAndUpdateDate();
    if (++currentPlayerID >= PLAYERS.length) currentPlayerID = 0;
    currentPlayer = PLAYERS[currentPlayerID];
    currentPlayer.calcCities();
    currentPlayer.produce();
    currentPlayer.growManpower();
    defaultGraphWithWeight = null;
    graphWithWeight = null;
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
