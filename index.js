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
  $date_token.innerHTML = date.toLocaleDateString("en-US");
  if (!window._weather) return;
  $date_token.title = `Supply: ${((_weather.supplyCx - 1) * 100).round().explicitSign()}%
Movement: ${((_weather.movementCx - 1) * 100).round().explicitSign()}%
Defense: ${((_weather.defenseCx - 1) * 100).round().explicitSign()}%`;
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

function playerSelectionScreen(alreadyWWII) {
  playerSelection.remove();
  playerSelection = document.createElement('waiting');
  let innerHTML = '<h1>Select players</h1><table style="width:70%;margin: auto;">';
  if (!alreadyWWII)
    innerHTML = `<h1>Scenarios:</h1>
      <p><button onclick="loadChina1941Scenario();playerSelectionScreen(1)">Load 1941 China scenario</button></p>
      <p><button onclick="load1944Scenario();playerSelectionScreen(1)">Load 1944 Europe scenario</button></p>
      <p><button onclick="load1941Scenario();playerSelectionScreen(1)">Load 1941 Europe scenario</button></p>
      <p><button onclick="load1939Scenario();playerSelectionScreen(1)">Load 1939 Europe scenario</button></p>` + innerHTML;
  PLAYERS.forEach((p, i) => {
    innerHTML += `
    <tr>
    <th>Player ${i}
    <td style="background: ${p.color.replace('0.2', '1')}">&nbsp;
    <td><button onclick='setAIFor(${i}, this)'>set AI</button>
    `;
  })
  innerHTML += '</table>' +
  `<br><br><button onclick="startPlayer.play();playerSelection.remove();if (currentPlayer.setAI) pass()">Start Game</button>  <button onclick="startObserveMode();observeMode();">Observe Game</button>
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
  weather_update();
  diplomacy_check();
  if (!currentPlayer) return;
  let start = new Date().getTime();
  let divs = [];
  for (let row of MAP_DATA) {
    for (let col of row) {
      if (col.waitUntil) {
        if (window.timestamp >= col.waitUntil.time) {
          let source = col.waitUntil.col;
          delete col.waitUntil;
          Object.assign(col, source);
        }
      }
      if (col.transferOwner) {
        if (col.transferOwner.cityFalls) {
          let city = MAP_DATA[col.transferOwner.cityFalls[0]][col.transferOwner.cityFalls[1]];
          if (city.owner == col.transferOwner.cityFalls[2]) {
            if (col.owner != col.transferOwner.newOwner) {
              col.divisions.forEach(x => {PLAYERS[col.transferOwner.newOwner].manpower += x.men});
              col.divisions = [];
              col.owner = col.transferOwner.newOwner;
            }
            delete col.transferOwner;
          }
        }
      }
      if (col.owner != currentPlayerID) continue;
      if (col.terrain != '@' && (col.divisions.length || !col.supply)) {
        if (col.divisions.length ? Math.random() > 0.6 || !col.supply : Math.random() > 0.9) {
          col.supply = 0;
          currentPlayer.cityList.forEach(p => {
            if (p.eq(col.pt)) col.supply = (col.supply + 1).max(1);
            //if (col.supply > 0) return;
            let path = unit_pathfind_friendly_only(col.pt, p).length;
            if (path < 15 && path > 0) {
              //col.supply++;
              col.supply = Math.max(col.supply, ((col.pt.terrain.movement).min(0.5) - (path / 15.0)).round(2)).min(0).max(col.pt.terrain.attrition * 10).max(1);
            }
          });
          currentPlayer.ports.forEach(p => {
            if (p.eq(col.pt)) col.supply = (col.supply + 1).max(1);
            //if (col.supply > 0) return;
            let path = unit_pathfind_friendly_only(col.pt, p).length;
            if (path < 15 && path > 0) {
              //col.supply++;
              col.supply = Math.max(col.supply, ((col.pt.terrain.movement).min(0.2) - (path / 10.0)).round(2)).min(0).max(col.pt.terrain.attrition * 10).max(1);
            }
          })
        }
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
    if (MAP_DATA[0][0].callTrigger) eval(MAP_DATA[0][0].callTrigger);
    handlePlayerOnPass();
    incrementAndUpdateDate();
    if (++currentPlayerID >= PLAYERS.length) {
      currentPlayerID = 0;
    }
    currentPlayer = PLAYERS[currentPlayerID];
    currentPlayer.calcCities();
    currentPlayer.produce();
    currentPlayer.growManpower();
    defaultGraphWithWeight = null;
    graphWithWeight = null;

    if (currentPlayerID == 0) {
      updateData();
      // if (window.observing)
      observeMode();
    }

    if (currentPlayer.setAI) {
      setTimeout(() => {
        currentPlayer.ai.think();
        waiting.remove();
        setTimeout(() => {
          pass()
        }, 0)
      }, 0)
      return;
    }

    // interface
    repaintCanvas();
    updateInterfaceOnPass();
    waiting.remove();
  }, 0);
}

pass();
