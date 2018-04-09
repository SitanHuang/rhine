function startEditOwner(color, index) {
  let tds = Array.from(canvasTable.getElementsByTagName('td'));
  window.MOUSEDOWN = false;
  tds.forEach(td => {
    colCallback = null;
    td.onclick = () => {}
    td.onmousedown = () => {
      MOUSEDOWN = true;
    }
    td.onmouseup = () => {
      MOUSEDOWN = false;
    }
    td.onmousemove = () => {
      let pt = td.pt;
      if (MOUSEDOWN) {
        td.style.backgroundColor = color;
        pt.prov.owner = index;
      }
    }
  })
}

function startEditCities() {
  let pts = [];
  Array.from(canvasTable.getElementsByTagName('td')).forEach(td => {
    let pt = td.pt;
    if (pt.prov.terrain == 'U') pts.push([pt, td]);
  })
  let i = 0;
  let exec = (pt, td) => {
    td.style.background = 'Black';
    i++;
    setTimeout(() => {
      let num = parseInt(prompt('how many factories?', '1'))
      pt.prov.slots = Array(num).fill('F');
      setTimeout(() => {
        exec(pts[i][0], pts[i][1]);
      }, 500)
    }, 2000)
  }
  exec(pts[0][0], pts[0][1]);
}
