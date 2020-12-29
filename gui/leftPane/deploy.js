function onTemplateSpecsChange() {
  let manpower = parseInt($('deployManpowerInput').value)
  let light = parseInt($('deployLightInput').value);
  let heavy = parseInt($('deployHeavyInput').value);
  let support = parseInt($('deploySupportInput').value).max(light / 2).floor();
  let motorized = parseInt($('deployMotorizedInput').value).max(heavy).floor();
  
  $('deploySupportInput').value = support;
  $('deployMotorizedInput').value = motorized;
  
  currentPlayer.defaultTemplate.troop = manpower;
  currentPlayer.defaultTemplate.light = light;
  currentPlayer.defaultTemplate.heavy = heavy;
  currentPlayer.defaultTemplate.support = support;
  currentPlayer.defaultTemplate.motorized = motorized;
  currentPlayer.defaultTemplate.defaultName = $('templateNameInput').value.deepClone();
  let terrain = TERRAINS[$('templateTerrainSelect').value];
  $('softAttackSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockSoft(terrain), 2, false, false);
  $('hardAttackSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockHard(terrain), 2, false, false);
  $('speedSpan').innerText = currentPlayer.defaultTemplate.mockSpeed(terrain) + SPEED_UNIT + ` (x${currentPlayer.defaultTemplate.speedBuff.round(2)})`;
  $('hardnessSpan').innerText = currentPlayer.defaultTemplate.hardness.round(2);
  $('supplyBuff').innerText = abbreviate(currentPlayer.defaultTemplate.supplyBuff, 2, false, false);
  $('casualtyBuff').innerText = abbreviate(getCasualtyReductionFromSupport({template: currentPlayer.defaultTemplate}), 2, false, false);
  $('entrenchBuff').innerText = abbreviate(currentPlayer.defaultTemplate.entrenchBuff, 2, false, false);
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

function navalInvadeOnClick(button) {
  let message_token = button.parentNode.parentNode.children[0];
  let light = SELECTED_UNITS.length * 10;
  let heavy = SELECTED_UNITS.length * 15;
  if (SELECTED_UNITS.length == 0) {
    message_token.style.color = 'red';
    message_token.innerText = 'No selected units';
  } else if (SELECTED_UNITS.filter(x => (x.loc.prov.terrain != 'P')).length) {
    message_token.style.color = 'red';
    message_token.innerText = 'Units not in ports.';
  } else if (currentPlayer.light < light || currentPlayer.heavy < heavy) {
    message_token.style.color = 'red';
    message_token.innerText = 'Insufficient Equip.';
  } else {
    message_token.style.color = 'blue';
    message_token.innerText = 'Select port';
    repaintCanvas(td => {
      REPAINTCANVAS_CALLBACK_UNITS(td);
      let pt = td.pt;
      if (pt.prov.terrain == 'P')
        td.style.cursor = 'pointer';
      else
        td.style.cursor = 'not-allowed';
    });
    colCallback = td => {
      if (td.style.cursor != 'pointer') return;
      SELECTED_UNITS.forEach(x => {
        x.action = [td.pt.navalInvasion];
      });
      navyPlayer.playSprite(0);
      message_token.style.color = 'default';
      message_token.innerText = `Mission launched.`;
      currentPlayer.light -= light;
      currentPlayer.heavy -= heavy;
      repaintCanvas();
    }
  }
}

function airStrikeOnClick(button) {
  let message_token = button.parentNode.parentNode.children[0];
  if (currentPlayer.light < 5 || currentPlayer.heavy < 10) {
    message_token.style.color = 'red';
    message_token.innerText = 'Insufficient Equip.';
  } else {
    message_token.style.color = 'blue';
    message_token.innerText = 'Select location';
    repaintCanvas(td => {
      REPAINTCANVAS_CALLBACK_UNITS(td);
      let pt = td.pt;
      if (pt.owner != currentPlayer && pt.prov.divisions.length && !pt.prov.divisions[0].airStriked)
        td.style.cursor = 'pointer';
      else
        td.style.cursor = 'not-allowed';
    });
    colCallback = td => {
      if (td.style.cursor != 'pointer') return;
      let damages = airStrikeProv(td.pt.prov.divisions);
      message_token.style.color = 'default';
      message_token.innerText = `${abbreviate(damages, 1, false, false)} damages.`;
      currentPlayer.light -= 5;
      currentPlayer.heavy -= 10;
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

var MINIMAL_TEMPLATE = new Template(242, 1, 1, '', 0.1, 0.1);
MINIMAL_TEMPLATE.defaultName = 'Temporary Squad';

function convertSelectedOnClick(button) {
  let msg = button ? button.nextElementSibling : null;
  if (SELECTED_UNITS.length == 0) {
    if (msg) msg.style.color = 'red';
    if (msg) msg.innerText = 'No selected units';
    if (msg) msg.style.display = 'block';
    return;
  }
  let netman = 0;
  let netlight = 0;
  let netheavy = 0;
  let nets = 0;
  let netm = 0;
  let dst = currentPlayer.defaultTemplate.deepClone();
  if (!dst.deployable(currentPlayer)) {
    if (msg) msg.style.color = 'red';
    if (msg) msg.innerText = 'Invalid Template';
    if (msg) msg.style.display = 'block';
    return;
  }
  SELECTED_UNITS.forEach(div => {
    netman += div.template.troop - dst.troop;
    netlight += div.template.light - dst.light;
    netheavy += div.template.heavy - dst.heavy;
    nets += div.template.support - dst.support;
    netm += div.template.motorized - dst.motorized;
  });
  let needman = currentPlayer.recruitable + netman;
  let needlight = currentPlayer.light + netlight + nets;
  let needheavy = currentPlayer.heavy + netheavy + netm;
  if (needman < 0 || needlight < 0 || needheavy < 0) {
    if (msg) msg.style.color = 'red';
    let html = 'Need the following:<br>';
    if (needman < 0)
      html += `Manpower: ${abbreviate(-needman, 2, false, false)} more<br>`;
    if (needlight < 0)
      html += `Light Equip.: ${abbreviate(-needlight, 2, false, false)} more<br>`;
    if (needheavy < 0)
      html += `Heavy Equip.: ${abbreviate(-needheavy, 2, false, false)} more<br>`;
    if (msg) msg.style.display = 'block';
    if (msg) msg.innerHTML = html;
    return;
  }
  if (msg) msg.style.color = 'blue';
  convertPlayer.playSprite(0);
  let html = 'Successful:<br>';
  html += `Light Equip.: net ${abbreviate(netlight + nets, 2, false, false)}<br>`;
  html += `Heavy Equip.: net ${abbreviate(netheavy + netm, 2, false, false)}<br>`;
  if (msg) msg.style.display = 'block';
  if (netman > 0) {
    currentPlayer.manpower += netman;
    html += `Manpower: net ${abbreviate(netman, 2, false, false)}<br>`;
  }
  currentPlayer.light += netlight + nets;
  currentPlayer.heavy += netheavy + netm;
  SELECTED_UNITS.forEach(div => {
    if (div.men > dst.troop) div.men = dst.troop;
    div.name = dst.defaultName;
    div.template = dst;
  });
  if (msg) msg.innerHTML = html;
  if (msg) repaintRightList();
}

function updateDeploy() {
  setLeftPaneActiveTab(2);
  $left_content.innerHTML = `
  <header>Naval Transport</header><br>
  <table class="statistic">
  <tr>
  <th>Light Equipments
  <td>10 * N
  <tr>
  <th>Heavy Equipments
  <td>15 * N
  <tr><td style="text-align: right;line-height: 2em;">
  <td class="small">
  <button class="shortcut" onclick="navalInvadeOnClick(this)" data-key='n'>Deploy</button><br>
  Key: N
  </table>
  <br><header>Air Strikes</header><br>
  <table class="statistic">
  <tr>
  <th>Light Equipments
  <td>5
  <tr>
  <th>Heavy Equipments
  <td>10
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
  <th>Light Equip.
  <td><input type=number value="${currentPlayer.defaultTemplate.light}"
    id="deployLightInput" oninput="onTemplateSpecsChange()">
  <tr>
  <th>Heavy Equip.
  <td><input type=number value="${currentPlayer.defaultTemplate.heavy}"
    id="deployHeavyInput" oninput="onTemplateSpecsChange()">
  <tr>
  <th>Support Equip.
  <td><input type=number value="${currentPlayer.defaultTemplate.support}"
    id="deploySupportInput" oninput="onTemplateSpecsChange()">
  <tr>
  <th>Motorized Equip.
  <td><input type=number value="${currentPlayer.defaultTemplate.motorized}"
    id="deployMotorizedInput" oninput="onTemplateSpecsChange()">
  <tr>
  <tr><th><td><br>
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
  <tr>
  <th>Hard Attack
  <td id="hardAttackSpan">
  <tr>
  <th>Speed
  <td id="speedSpan">
  <tr>
  <th>Hardness
  <td id="hardnessSpan"><br>
  <tr>
  <th>Supply factor
  <td id="supplyBuff"><br>
  <tr>
  <th>Casualty factor
  <td id="casualtyBuff"><br>
  <tr>
  <th>Entrench factor
  <td id="entrenchBuff"><br>
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
  <tr><td colspan=2>
  <button data-custom-sound onclick="convertSelectedOnClick(this)">Convert Selected</button>
  <font style="display: none;"></font>
  <tr><th><td>
  <button onclick="saveTemplateOnClick(this)">Save</button>
  </table>
  <br><header>Saved Templates</header><br>
  <table class="statistic">
  ${renderSavedTemplates()}
  </table>
  `;
  onTemplateSpecsChange();
  jQuery('#left-content button:not([data-custom-sound])').bind( "click", function() {
    buttonsPlayer.playSprite(7 + 3/60, 7 + 14/60);
  });
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
