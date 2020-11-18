var canvasTable = $('app');
let canvasTableTransformScaleFactor = 1.49;
canvasTable.style.transform = 'scale(1.49)';

REPAINTCANVAS_CALLBACK_FRIENDLY_CLICKABLE = td => {
  let pt = td.pt;
  if (pt.owner == currentPlayer)
    td.style.cursor = 'pointer';
  else
    td.style.cursor = 'not-allowed';
}

REPAINTCANVAS_CALLBACK_UNITS = td => {
  let pt = td.pt;
  let prov = pt.prov;
  let num = prov.divisions.length;
  if (prov.terrain == '@') return;
  if (window.observing) {
    if (prov.divisions.length) {
      let army = document.createElement('army');
      army.innerText = ' ';
      army.style.width = '5px';
      army.style.height = '5px';
      army.style.left = '10px';
      army.style.top = '10px';
      army.style.borderRadius = '25%';
      army.style.backgroundColor = pt.owner.color.replace('0.2', '1');
      td.appendChild(army);
    }
  } else if (pt.owner == currentPlayer || pt.adjacentToPlayer(currentPlayer)) {
    if (num > 0) {
      let number = document.createElement('number');
      number.innerText = num;
      number.title = prov.divisions.map(x => x.name).join('\n');
      td.appendChild(number)
      let battles = [];
      let color = 'transparent';
      let avgHP = 0;
      let avgMorale = 0;
      prov.divisions.forEach(x => {
        avgHP += x.hp.min(0);
        avgMorale += x.morale.min(0) * 100;
        battles = battles.concat(x.battleInfo);
        if (x.color != 'transparent') color = x.color;
      });
      avgHP /= num;
      avgMorale /= num;
      td.appendChild(jQuery("<div class='hpIndicator' style='width: " + avgHP  + "%;height: 2px;position: absolute; top: 2;left: 2px;max-width: calc(100% - 2px); background: green;'> </div>")[0]);
      td.appendChild(jQuery("<div class='hpIndicator' style='width: " + avgMorale  + "%;height: 2px;position: absolute; top: 4;left: 2px;max-width: calc(100% - 2px);background: orange;'> </div>")[0]);
      if (battles.length > 0) {
        let mark = document.createElement('mark');
        mark.innerText = ' ';
        let battleInfo = combineBattleInfos(battles);
        mark.style.background = getColorFromPercentage(battleInfo.percentage[0]);
        mark.style.zIndex = 3;
        mark.title = (battleInfo.percentage[0] * 100).round(2) + '% toward victory, Casualtis: ' + battleInfo.casualties[0].round() + '-' + battleInfo.casualties[1].round() + '(' + (battleInfo.casualties[0] / battleInfo.casualties[1]).round(2) + ')';
        td.appendChild(mark);
      }
      if (color != 'transparent' && pt.owner == currentPlayer) {
        let army = document.createElement('army');
        army.innerText = ' ';
        army.style.backgroundColor = color;
        td.appendChild(army);
      }
    }
    if (window.politicalView) td.style.background = pt.owner.color.replace('0.2', '0.5');
  } else {
    if (!window.politicalView) td.style.background = pt.owner.color.replace('0.2', '0.5');
  }
  if (num > 0) {
    let as = prov.divisions.filter(x => x.airStriked).length;
    if (as > 0) {
      let mark = document.createElement('mark');
      mark.innerText = ' ';
      mark.title = `${as} divisions are air-striked.`
      mark.className = 'airStrike';
      td.appendChild(mark);
    }
  }
}

DEFAULT_REPAINTCANVAS_CALLBACK = td => {
  REPAINTCANVAS_CALLBACK_UNITS(td);
  // SELECTED_UNITS.forEach(div => {
  //   div.loc.td.style.background = 'rgba(0, 0, 0, 0.6)';
  //   div.action.forEach((p, i) => {
  //     let td = p.td;
  //     td.style.background = 'rgba(0, 0, 0, 0.4)'
  //   })
  // });
  colCallback = td => {
    let pt = td.pt;
    let prov = pt.prov;
    let num = prov.divisions.length;
    if (pt.owner == currentPlayer) {
      if (num > 0) {
        if (shiftDown)
          SELECTED_UNITS = SELECTED_UNITS.concat(prov.divisions);
        else
          SELECTED_UNITS = [].concat(prov.divisions)
      } else if (!shiftDown)
        SELECTED_UNITS = [];
    } else if (!shiftDown)
      SELECTED_UNITS = [];
    repaintRightList();
  }
};

SHOW_GRID = false

function repaintProv(td) {
  let pt = td.pt;
  let prov = pt.prov;
  if (prov.terrain == '@') return;
  let player = pt.owner;
  td.style.background = player && prov.terrain != '@' ? player.color : 'white';
  td.style.cursor = 'default';
  td.style.transform = 'none';
  td.className = '';
  Array.from(td.children).forEach(child => {
    if (child.tagName.toLowerCase() != 'terrain') child.remove();
  })
  if (prov.fort) {
    let fort = document.createElement('mark');
    fort.className = 'fortified';
    fort.title = 'Fortified. Strength + 50%. Could be taken by enemy.';
    fort.innerText = '🛡️';
    td.appendChild(fort)
  }


  td.onmouseenter = () => {
    if (mouseDown && shiftDown) {
      console.log(`Click: ${td.pt}`)
      if (colCallback) colCallback(td);
    }
  };
  td.onclick = () => {
    console.log(`Click: ${td.pt}`)
    if (colCallback) colCallback(td);
  };
  td.oncontextmenu = () => {
    if (colRightClickCallback) {
      colRightClickCallback(td);
    }
    return false;
  }
}

let current_repaintcanvas_callback = DEFAULT_REPAINTCANVAS_CALLBACK;

function repaintCanvas(callback, quick) {
  current_repaintcanvas_callback = callback = callback ? callback : DEFAULT_REPAINTCANVAS_CALLBACK;
  let start = new Date().getTime();
  for (let tr of canvasTable.children) {
    for (let td of tr.children) {
      let pt = td.pt;
      let terrain = pt.prov.terrain;
      if (terrain == '@') continue;
      if (!quick) {
        repaintProv(td);
        callback(td)
      } else {
        if (pt.owner == currentPlayer || pt.adjacentToPlayer(currentPlayer)) {
          td.style.background = terrain != '@' ? pt.owner.color : 'white';
          if (window.politicalView) td.style.background = pt.owner.color.replace('0.2', '0.5');
        } else {
          td.style.background = pt.owner.color.replace('0.2', '0.5');
        }
      }
    }
  }
  SELECTED_UNITS.forEach(div => {
    div.loc.td.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.action.forEach(pt => {
      pt.td.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
    })
  })
  console.log(`repaintCanvas(quick=${ !!quick }) ended in ${new Date().getTime() - start}ms`)
}

function reinitCanvas() {
  let start = new Date().getTime();
  canvasTable.innerHTML = '';
  MAP_DATA.forEach((row, rowIndex) => {
    let tr = document.createElement('tr');
    row.tr = tr;
    row.forEach((col, colIndex) => {
      let td = document.createElement('td');
      td.innerText = ' ';

      let terr = document.createElement('terrain');
      // terr.innerText = col.terrain;
      terr.innerText = col.pt.terrain.render;
      terr.style.color = col.pt.terrain.color;
      td.appendChild(terr);
      td.pt = pt(rowIndex, colIndex)

      repaintProv(td);

      tr.appendChild(td);
    });
    canvasTable.appendChild(tr);
  });
  canvasTable.style.width = `${MAP_DATA[0].length * 28}px`;
  canvasTable.style.height = `${MAP_DATA.length * 28}px`;
  console.log(`reinitCanvas() ended in ${new Date().getTime() - start}ms`)
}

function zoomIn() {
  canvasTableTransformScaleFactor *= 1.2;
  canvasTable.style.transform = `scale(${canvasTableTransformScaleFactor})`;
}

function zoomOut() {
  canvasTableTransformScaleFactor /= 1.2;
  canvasTable.style.transform = `scale(${canvasTableTransformScaleFactor})`;
}

function toggleGrid() {
  SHOW_GRID = !SHOW_GRID;
  canvasTable.className = 'SHOW_GRID' + SHOW_GRID;
}
