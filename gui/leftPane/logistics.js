function onFactoryRatioChange(slider) {
  let value = parseInt(slider.value);
  currentPlayer.factoryInLight = value;
  $('lightNum').innerText = value;
  $('heavyNum').innerText = currentPlayer.factoryInHeavy;
  $('constructionNum').innerText = Math.round(value + currentPlayer.factoryInHeavy / 2);
}

const REPAINT_SHOW_FACTORIES_CALLBACK = td => {
  let pt = td.pt;
  let prov = pt.prov;
  let num = factoriesInProv(prov);
  td.style.cursor = 'pointer';
  if (pt.owner == currentPlayer) {
    if(num > 0) {
      let number = document.createElement('number');
      number.innerText = num;
      td.appendChild(number)
      if (num >= pt.terrain.slots) {
        td.style.cursor = 'not-allowed';
      }
    }
  } else {
    td.style.cursor = 'not-allowed';
  }
};
const REPAINT_SHOW_SUPPLY_CALLBACK = td => {
  let pt = td.pt;
  let prov = pt.prov;
  let num = prov.divisions.length;
  if (pt.owner == currentPlayer) {
    if(num > 0) {
      let number = document.createElement('number');
      number.innerText = prov.divisions[0].supply;
      td.appendChild(number)
    }
  }
};

function toggleFactoriesOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
      toggleFactoriesOnClick(button);
      colCallback(td)
    }
    repaintCanvas(REPAINT_SHOW_FACTORIES_CALLBACK);
  }
}

function toggleSuppliesOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
      toggleSuppliesOnClick(button);
      colCallback(td)
    }
    repaintCanvas(REPAINT_SHOW_SUPPLY_CALLBACK);
  }
}

function buildFactoryOnClick(button) {
  if (currentPlayer.constructionPoints < 750) {
    button.parentNode.children[2].style.display = 'block';
    return;
  }
  button.parentNode.children[3].style.display = 'block';
  repaintCanvas(REPAINT_SHOW_FACTORIES_CALLBACK);
  colCallback = (td) => {
    let pt = td.pt;
    let prov = pt.prov;
    let num = factoriesInProv(prov);
    if (td.style.cursor == 'not-allowed') return;
    prov.slots.push('F');
    currentPlayer.factories++;
    currentPlayer.constructionPoints -= 750;
    colCallback = null;
    button.parentNode.children[3].style.display = 'none';
    updateLogistics();
    repaintCanvas();
  }
}

function buildFortOnClick(button) {
  if (currentPlayer.constructionPoints < 250) {
    button.parentNode.children[2].style.display = 'block';
    return;
  }
  button.parentNode.children[3].style.display = 'block';
  repaintCanvas((td) => {
    let pt = td.pt;
    let prov = pt.prov;
    td.style.cursor = 'pointer';
    if (pt.owner == currentPlayer && prov.fort || pt.owner != currentPlayer) {
      td.style.cursor = 'not-allowed';
    }
  });
  colCallback = (td) => {
    let pt = td.pt;
    let prov = pt.prov;
    if (td.style.cursor == 'not-allowed') return;
    prov.fort = true;
    currentPlayer.constructionPoints -= 250;
    colCallback = null;
    button.parentNode.children[3].style.display = 'none';
    updateLogistics();
    repaintCanvas();
  }
}

function updateLogistics() {
  setLeftPaneActiveTab(0);
  $left_content.innerHTML = `
  <table class="statistic">
  <tr>
  <th>Recruitable Manpower
  <td>${abbreviate(currentPlayer.recruitable, 2, false, false)}
  </tr>
  <tr>
  <th>Total Casualties
  <td>${abbreviate(currentPlayer.casualties, 2, false, false)}
  </tr>
  <tr>
  <th>Average Strength
  <td>${currentPlayer.averageStrength.round(2)}%
  </tr>
  <tr>
  <th>
  <td>(+${(currentPlayer.growthRate * 100).round(3)}%)
  </tr>
  <tr>
  <th>Cities
  <td>${currentPlayer.cities}
  </tr>
  <tr>
  <th>Divisions
  <td>${currentPlayer.divisions}
  </tr>
  <tr></tr><tr></tr>
  <tr>
  <th>Factories
  <td>${currentPlayer.factories}
  </tr>
<tr>
  <th>Light Equipments
  <td>${abbreviate(currentPlayer.light, 2, false, false)}
  </tr>
  <tr>
  <th>Heavy Equipments
  <td>${abbreviate(currentPlayer.heavy, 2, false, false)}
  </tr>
  </table>
  <strong>Production ratio:</strong>
  <input type="range" min="1" max="${currentPlayer.factories}" value="${currentPlayer.factoryInLight}" class="slider"
    oninput="onFactoryRatioChange(this)">
  Light: <span id="lightNum">${currentPlayer.factoryInLight}</span><br>
  Heavy: <span id="heavyNum">${currentPlayer.factoryInHeavy}</span><br><br>
  Construction: <span id="constructionNum">${Math.round(currentPlayer.factoryInLight + currentPlayer.factoryInHeavy / 2)}</span><br><br>
  <table class="statistic">
  <tr>
  <th>Construction Points
  <td>${abbreviate(currentPlayer.constructionPoints, 2, false, false)}
  <tr>
  <th>
  <button onclick="buildFortOnClick(this)">Build Fort</button><br>
  <font style="display: none" color="red">Not enough pts</font>
  <font style="display: none">Select location</font>
  <td>250 pts
  <tr>
  <th>
  <button onclick="buildFactoryOnClick(this)">Build Factory</button><br>
  <font style="display: none" color="red">Not enough pts</font>
  <font style="display: none">Select location</font>
  <td>750 pts
  </table>
  <br>
  <button onclick="toggleFactoriesOnClick(this)">Toggle Factories View</button><br><br>
  <button onclick="toggleSuppliesOnClick(this)">Toggle Supplies View</button><br>
  <br><br><br>
  <p>V0.7.6</p>
  `;
}
