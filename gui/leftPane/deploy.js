function onTemplateSpecsChange() {
  let manpower = parseInt($('deployManpowerInput').value)
  let light = parseInt($('deployLightInput').value)
  let heavy = parseInt($('deployHeavyInput').value)
  currentPlayer.defaultTemplate.troop = manpower;
  currentPlayer.defaultTemplate.light = light;
  currentPlayer.defaultTemplate.heavy = heavy;
  currentPlayer.defaultTemplate.defaultName = $('templateNameInput').value.deepClone();
  let terrain = TERRAINS[$('templateTerrainSelect').value];
  $('softAttackSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockSoft(terrain), 2, false, false);
  $('hardAttackSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockHard(terrain), 2, false, false);
  $('speedSpan').innerText = currentPlayer.defaultTemplate.mockSpeed(terrain) + SPEED_UNIT;
  $('breakThroughSpan').innerText = currentPlayer.defaultTemplate.breakThrough.round(2);
}

const REPAINT_DEPLOY_CALLBACK = td => {
  let pt = td.pt;
  let prov = pt.prov;
  td.style.cursor = 'pointer';
  if (pt.owner == currentPlayer) {
    let number = document.createElement('number');
    number.innerText = num;
    td.appendChild(number)
    if (num >= pt.terrain.slots) {
      td.style.cursor = 'not-allowed';
    }
  } else {
    td.style.cursor = 'not-allowed';
  }
};

function saveTemplateOnClick() {
	currentPlayer.savedTemplates.push(currentPlayer.defaultTemplate.deepClone());
	updateDeploy();
}

function airStrikeOnClick(button) {
  let message_token = button.parentNode.parentNode.children[0];
  if (currentPlayer.light < 10 || currentPlayer.heavy < 20) {
    message_token.style.color = 'red';
    message_token.innerText = 'Insufficient Equip.';
  } else {
    message_token.style.color = 'blue';
    message_token.innerText = 'Select location';
    repaintCanvas(td => {
      REPAINTCANVAS_CALLBACK_UNITS(td);
      let pt = td.pt;
      if (pt.owner != currentPlayer)
        td.style.cursor = 'pointer';
      else
        td.style.cursor = 'not-allowed';
    });
    colCallback = td => {
      if (td.style.cursor != 'pointer') return;
      let damages = airStrikeProv(td.pt.prov.divisions);
      message_token.style.color = 'default';
      message_token.innerText = `${abbreviate(damages, 1, false, false)} damages.`;
      currentPlayer.light -= 10;
      currentPlayer.heavy -= 20;
      repaintCanvas();
    }
  }
}

function deployOnClick(button) {
  let template = currentPlayer.defaultTemplate;
  button.parentNode.children[1].style.display = 'none';
  button.parentNode.children[2].style.display = 'block';
  if (template.deployable(currentPlayer)) {
    repaintCanvas(td => {
      REPAINTCANVAS_CALLBACK_UNITS(td);
      let pt = td.pt;
	    if (pt.owner == currentPlayer && pt.prov.terrain == 'U')
        td.style.cursor = 'pointer';
      else
        td.style.cursor = 'not-allowed';
    });
    colCallback = td => {
      if (td.style.cursor != 'pointer') return;
      button.parentNode.children[2].style.display = 'none';
      template.deploy(currentPlayer, td.pt, $('templateNameInput').value.trim())
      repaintCanvas();
    }
  } else {
    button.parentNode.children[1].style.display = 'block';
    button.parentNode.children[2].style.display = 'none';
  }
}

function updateDeploy() {
  setLeftPaneActiveTab(2);
  $left_content.innerHTML = `
  <header>Air Strikes</header><br>
  <table class="statistic">
  <tr>
  <th>Light Equipments
  <td>10
  <tr>
  <th>Heavy Equipments
  <td>20
  <tr><td style="text-align: right;line-height: 2em;">
  <td class="small">
  <button class="shortcut" onclick="airStrikeOnClick(this)" data-key='s'>Deploy</button><br>
  Key: S
  </table>
  <br><header>Edit Division Template</header><br>
  <table class="statistic">
  <tr>
  <th>Manpower
  <td><input type=number value="${currentPlayer.defaultTemplate.troop}"
    id="deployManpowerInput" oninput="onTemplateSpecsChange()">
  <tr>
  <th>Light Equipments
  <td><input type=number value="${currentPlayer.defaultTemplate.light}"
    id="deployLightInput" oninput="onTemplateSpecsChange()">
  <tr>
  <th>Heavy Equipments
  <td><input type=number value="${currentPlayer.defaultTemplate.heavy}"
    id="deployHeavyInput" oninput="onTemplateSpecsChange()">
  <tr>
  <th>View Specs Under:<td>
  <tr>
  <th>
  <select id="templateTerrainSelect" onchange="onTemplateSpecsChange()">
  ${(() => {
    let s = '';
    for (let key in TERRAINS) {
      s += `<option value="${key}">${TERRAINS[key].name}</option>`;
    }
    return s;
  })()}
  </select>
  <td>
  <tr>
  <th>Soft Attack
  <td id="softAttackSpan"><br>
  <tr><th><td class="small">(Regardless of HP & skill)
  <tr>
  <th>Hard Attack
  <td id="hardAttackSpan">
  <tr><th><td class="small">(Regardless of HP & skill)
  <tr>
  <th>Speed
  <td id="speedSpan">
  <tr><th><td class="small">(Regardless of HP & skill)
  <tr>
  <th>Breakthrough
  <td id="breakThroughSpan"><br>
  <tr><th><td><br>
  <tr><th>Title:<td><br>
  <tr>
  <th colspan=2><input value="${currentPlayer.defaultTemplate.defaultName}" style="width: 100%" id="templateNameInput"
    onkeyup="onTemplateSpecsChange()">
  <tr><th><button onclick="$('templateNameInput').value = (currentPlayer.defaultTemplate.codeName);onTemplateSpecsChange()">AutoName</button><br>
  <td class="small">Key: D
  <button class="shortcut" onclick="deployOnClick(this)" data-key='d'>Deploy</button>
  <font color="red" style="display:none">Invalid Template</font>
  <font color="blue" style="display:none">Select city</font>
  <tr><th><td><button onclick="saveTemplateOnClick(this)">Save</button>
  </table>
  <br><header>Saved Templates</header><br>
  <table class="statistic">
  ${renderSavedTemplates()}
  </table>
  `;
  onTemplateSpecsChange();
}


function renderSavedTemplates() {
  let buffer = '';
  currentPlayer.savedTemplates.forEach((tem, i) => {
    buffer += `<tr><th style="vertical-align: middle;border-bottom: 1px solid grey;">${tem.defaultName}<td width="100px">
	<button onclick="currentPlayer.savedTemplates.splice(${i}, 1);updateDeploy()">❌</button>`+
	`<button style="vertical-align: top;font-size: 20px;" onclick="currentPlayer.defaultTemplate = currentPlayer.savedTemplates[${i}].deepClone();updateDeploy()">⤊</button>`;
  });
  return buffer;
}
