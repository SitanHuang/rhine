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
function toggleStrengthOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
    }
    let max = 0;
    MAP_DATA.forEach(row => {
      row.forEach(col => {
        if (col.owner == currentPlayerID) {
          let num = 0;
          col.divisions.forEach(x => {num += x.soft + x.hard});
          max = Math.max(max, num);
        }
      })
    });
    repaintCanvas(function (td) {
      let pt = td.pt;
      let prov = pt.prov;
      td.style.cursor = 'pointer';
      if (pt.owner == currentPlayer) {
        td.style.backgroundColor = 'white';
        if(prov.divisions.length > 0) {
          let num = 0;
          prov.divisions.forEach(x => {num += x.soft + x.hard});
          td.style.backgroundColor = getColorFromPercentage(num / max, [{"pct":0,"color":{"r":180,"g":0,"b":0}},{"pct":0.5,"color":{"r":180,"g":180,"b":0}},{"pct":1,"color":{"r":32,"g":158,"b":32}}]);
        }
      } else {
        td.style.backgroundColor = 'grey';
      }
    });
  }
}
function toggleStrengthByMenOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
    }
    let max = 0;
    MAP_DATA.forEach(row => {
      row.forEach(col => {
        if (col.owner == currentPlayerID) {
          let num = 0;
          col.divisions.forEach(x => {num += x.men});
          max = Math.max(max, num);
        }
      })
    });
    repaintCanvas(function (td) {
      let pt = td.pt;
      let prov = pt.prov;
      td.style.cursor = 'pointer';
      if (pt.owner == currentPlayer) {
        td.style.backgroundColor = 'white';
        if(prov.divisions.length > 0) {
          let num = 0;
          prov.divisions.forEach(x => {num += x.men});
          td.style.backgroundColor = getColorFromPercentage(num / max, [{"pct":0,"color":{"r":180,"g":0,"b":0}},{"pct":0.5,"color":{"r":180,"g":180,"b":0}},{"pct":1,"color":{"r":32,"g":158,"b":32}}]);
        }
      } else {
        td.style.backgroundColor = 'grey';
      }
    });
  }
}
function toggleAverageStrengthOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
    }
    let max = 0;
    MAP_DATA.forEach(row => {
      row.forEach(col => {
        if (col.owner == currentPlayerID && col.divisions.length > 0) {
          let num = 0;
          col.divisions.forEach(x => {num += x.men});
          max = Math.max(max, num / col.divisions.length);
        }
      })
    });
    repaintCanvas(function (td) {
      let pt = td.pt;
      let prov = pt.prov;
      td.style.cursor = 'pointer';
      if (pt.owner == currentPlayer) {
        td.style.backgroundColor = 'white';
        if(prov.divisions.length > 0) {
          let num = 0;
          prov.divisions.forEach(x => {num += x.men});
          num = num / prov.divisions.length;
          td.style.backgroundColor = getColorFromPercentage(num / max, [{"pct":0,"color":{"r":180,"g":0,"b":0}},{"pct":0.5,"color":{"r":180,"g":180,"b":0}},{"pct":1,"color":{"r":32,"g":158,"b":32}}]);
        }
      } else {
        td.style.backgroundColor = 'grey';
      }
    });
  }
}
function toggleAverageStrengthHPOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
    }
    let max = 0;
    MAP_DATA.forEach(row => {
      row.forEach(col => {
        if (col.owner == currentPlayerID && col.divisions.length > 0) {
          let num = 0;
          col.divisions.forEach(x => {num += x.hp});
          max = Math.max(max, num / col.divisions.length);
        }
      })
    });
    repaintCanvas(function (td) {
      let pt = td.pt;
      let prov = pt.prov;
      td.style.cursor = 'pointer';
      if (pt.owner == currentPlayer) {
        td.style.backgroundColor = 'white';
        if(prov.divisions.length > 0) {
          let num = 0;
          prov.divisions.forEach(x => {num += x.hp});
          num = num / prov.divisions.length;
          td.style.backgroundColor = getColorFromPercentage(num / max, [{"pct":0,"color":{"r":180,"g":0,"b":0}},{"pct":0.5,"color":{"r":180,"g":180,"b":0}},{"pct":1,"color":{"r":32,"g":158,"b":32}}]);
        }
      } else {
        td.style.backgroundColor = 'grey';
      }
    });
  }
}
function toggleAverageSkillOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
    }
    let max = 0;
    MAP_DATA.forEach(row => {
      row.forEach(col => {
        if (col.owner == currentPlayerID && col.divisions.length > 0) {
          let num = 0;
          col.divisions.forEach(x => {num += x.skill});
          max = Math.max(max, num / col.divisions.length);
        }
      })
    });
    repaintCanvas(function (td) {
      let pt = td.pt;
      let prov = pt.prov;
      td.style.cursor = 'pointer';
      if (pt.owner == currentPlayer) {
        td.style.backgroundColor = 'white';
        if(prov.divisions.length > 0) {
          let num = 0;
          prov.divisions.forEach(x => {num += x.skill});
          num = num / prov.divisions.length;
          td.style.backgroundColor = getColorFromPercentage(num / max, [{"pct":0,"color":{"r":180,"g":0,"b":0}},{"pct":0.5,"color":{"r":180,"g":180,"b":0}},{"pct":1,"color":{"r":32,"g":158,"b":32}}]);
          let number = document.createElement('number');
          number.innerText = num.round();
          td.appendChild(number)
        }
      } else {
        td.style.backgroundColor = 'grey';
      }
    });
  }
}
function toggleAverageMoraleOnClick(button) {
  if (button.showing) {
    button.className = '';
    button.showing = false;
    repaintCanvas();
  } else {
    button.className = 'active';
    button.showing = true;
    let oldCallback = colCallback;
    colCallback = td => {
    }
    let max = 0;
    MAP_DATA.forEach(row => {
      row.forEach(col => {
        if (col.owner == currentPlayerID && col.divisions.length > 0) {
          let num = 0;
          col.divisions.forEach(x => {num += x.morale});
          max = Math.max(max, num / col.divisions.length);
        }
      })
    });
    repaintCanvas(function (td) {
      let pt = td.pt;
      let prov = pt.prov;
      td.style.cursor = 'pointer';
      if (pt.owner == currentPlayer) {
        td.style.backgroundColor = 'white';
        if(prov.divisions.length > 0) {
          let num = 0;
          prov.divisions.forEach(x => {num += x.morale});
          num = num / prov.divisions.length;
          td.style.backgroundColor = getColorFromPercentage(num / max, [{"pct":0,"color":{"r":180,"g":0,"b":0}},{"pct":0.5,"color":{"r":180,"g":180,"b":0}},{"pct":1,"color":{"r":32,"g":158,"b":32}}]);
          let number = document.createElement('number');
          number.innerText = (num * 10).round();
          td.appendChild(number)
        }
      } else {
        td.style.backgroundColor = 'grey';
      }
    });
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
  <button onclick="toggleSuppliesOnClick(this)">Toggle Supplies View</button><br><br>
  <button onclick="toggleStrengthByMenOnClick(this)">Toggle Strength View (By Men)</button><br><br>
  <button onclick="toggleAverageStrengthOnClick(this)">Toggle Average Strength View (By men)</button><br><br>
  <button onclick="toggleAverageStrengthHPOnClick(this)">Toggle Average Strength View (By HP)</button><br><br>
  <button onclick="toggleAverageSkillOnClick(this)">Toggle Average Skill View</button><br><br>
  <button onclick="toggleAverageMoraleOnClick(this)">Toggle Average Morale View</button><br><br>
  <br><br><br>
  <p>V1.0.2</p>
  `;
}
