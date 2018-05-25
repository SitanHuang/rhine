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
  if (pt.owner == currentPlayer || pt.adjacentToPlayer(currentPlayer)) {
    if (num > 0) {
      let number = document.createElement('number');
      number.innerText = num;
      number.title = prov.divisions.map(x => x.name).join('\n');
      td.appendChild(number)
      let battles = [];
      prov.divisions.forEach(x => {
        battles = battles.concat(x.battleInfo)
      });
      if (battles.length > 0) {
        let mark = document.createElement('mark');
        mark.innerText = ' ';
        let battleInfo = combineBattleInfos(battles);
        mark.style.background = getColorFromPercentage(battleInfo.percentage[0]);
        mark.title = (battleInfo.percentage[0] * 100).round(2) + '% toward victory';
        td.appendChild(mark);
      }
    }
  } else {
    td.style.background = pt.owner.color.replace('0.2', '0.5');
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
      if (num > 0)
        if (shiftDown)
          SELECTED_UNITS = SELECTED_UNITS.concat(prov.divisions);
        else
          SELECTED_UNITS = [].concat(prov.divisions)
      else
        SELECTED_UNITS = [];
    } else
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


  td.onclick = () => {
    console.log(`Click: ${td.pt}`)
    if (colCallback) colCallback(td);
  };
  td.oncontextmenu = () => {
    if (colRightClickCallback) colRightClickCallback(td);
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
