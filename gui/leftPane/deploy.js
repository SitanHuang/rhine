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
  $('softAttackSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockSoftAttack(terrain), 2, false, false);
  $('hardAttackSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockHardAttack(terrain), 2, false, false);
  $('softDefenseSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockSoftDefense(terrain), 2, false, false);
  $('hardDefenseSpan').innerText = abbreviate(currentPlayer.defaultTemplate.mockHardDefense(terrain), 2, false, false);
  $('speedSpan').innerText = currentPlayer.defaultTemplate.mockSpeed(terrain) + SPEED_UNIT + ` (x${currentPlayer.defaultTemplate.speedBuff.round(2)})`;
  $('hardnessSpan').innerText = currentPlayer.defaultTemplate.hardness.round(2);
  $('armorSpan').innerText = currentPlayer.defaultTemplate.armor.round(2);
  $('armoredSpan').innerText = (!!currentPlayer.defaultTemplate.armored)+"";
  $('supplyBuff').innerText = abbreviate(currentPlayer.defaultTemplate.supplyBuff, 2, false, false);
  $('casualtyBuff').innerText = abbreviate(currentPlayer.defaultTemplate.casualtyReductionFromSupport_Battle, 2, false, false);
  $('entrenchBuff').innerText = abbreviate(currentPlayer.defaultTemplate.entrenchBuff, 2, false, false);
  $('reinforceRate').innerText = abbreviate(currentPlayer.defaultTemplate.reinforceRate, 2, false, false);
  $('costSpan').innerText = currentPlayer.defaultTemplate.productionCost;
  $('powerCostSpan').innerText = (currentPlayer.defaultTemplate.productionEfficiency + ' ' +
                                 (currentPlayer.defaultTemplate.armored ?
                                 `(${currentPlayer.defaultTemplate.productionEfficiencyPierced} D/
                                  ${currentPlayer.defaultTemplate.productionEfficiencyPiercedAttacking} A)` : ''));
  $('powerManSpan').innerText = (currentPlayer.defaultTemplate.manpowerEfficiency + ' ' +
                                (currentPlayer.defaultTemplate.armored ?
                                `(${currentPlayer.defaultTemplate.manpowerEfficiencyPierced} D/
                                  ${currentPlayer.defaultTemplate.manpowerEfficiencyPiercedAttacking} A)` : ''));
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
      if (pt.owner != currentPlayer && !pt.prov.divisions[0]?.airStriked && !pt.prov.airStriked)
        td.style.cursor = 'pointer';
      else
        td.style.cursor = 'not-allowed';
    });
    colCallback = td => {
      if (td.style.cursor != 'pointer') return;
      let ofacs = factoriesInProv(td.pt.prov);
      let oaa = antiAirInProv(td.pt.prov);
      let [damages, facs] = airStrikeProv(td.pt.prov);
      message_token.style.color = 'default';
      message_token.innerText = `${abbreviate(damages, 1, false, false)} damages. \n`;
      if (facs) {
        message_token.innerText += `${ofacs - factoriesInProv(td.pt.prov)} factories &`;
        message_token.innerText += ` ${oaa - antiAirInProv(td.pt.prov)} AA destroyed.`;
      }
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

function queueLocOnClick(button) {
  let template = currentPlayer.defaultTemplate;
  button.nextElementSibling.style.display = 'block';
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
    button.nextElementSibling.style.display = 'none';
    currentPlayer.queueDist = td.pt;
    updateDeploy();
    repaintCanvas();
  }
}

function deployALlOnClick() {
  deploy_all_queue();
  updateDeploy();
  repaintCanvas();
}

function queueOnClick(button) {
  let max = shiftDown ? 5 : 1;
  for (let i = 0;i < max;i++) {
    let tem = currentPlayer.defaultTemplate;
    let msg = button ? button.nextElementSibling : {style:{}};
    msg.style.display = 'block';
    if (Math.min(currentPlayer.light, currentPlayer.heavy) < 0) {
      msg.innerText = 'Negative stockpile'
    } else if (tem.deployable(currentPlayer, true)) {
      msg.style.display = 'none';
      add_queue(new_queue(tem));
      updateDeploy();
    } else {
      msg.innerText = 'Invalid template'
    }
  }
}

var MINIMAL_TEMPLATE = new Template(400, 1, 1, '', 0.1, 0.1);
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
  if (!dst.deployable(currentPlayer, true)) {
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
  <br><header>Division Template Editor</header><br>
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
  <tr>
  <th>Cost
  <td id="costSpan">
  <br>
  <tr>
  <th>Power/cost
  <td id="powerCostSpan">
  <br>
  <tr>
  <th>Power/man
  <td id="powerManSpan">
  <br>
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
  <th>Soft Defense
  <td id="softDefenseSpan"><br>
  <tr>
  <th>Hard Defense
  <td id="hardDefenseSpan">
  <tr>
  <th>Speed
  <td id="speedSpan">
  <tr>
  <th title="Amount of hard attack vs soft attack the division receives">Hardness
  <td id="hardnessSpan"><br>
  <tr>
  <th title="If armored, division takes half of damage if it can pierce the enemy.">Armored
  <td id="armoredSpan"><br>
  <tr>
  <th title="If armored, division takes half of damage if it can pierce the enemy.">Armor
  <td id="armorSpan"><br>
  <tr>
  <th>Supply factor
  <td id="supplyBuff"><br>
  <tr>
  <th>Casualty factor
  <td id="casualtyBuff"><br>
  <tr>
  <th>Entrench factor
  <td id="entrenchBuff"><br>
  <tr>
  <th>Reinforce Rate
  <td id="reinforceRate"><br>
  <tr><th><td><br>
  <tr><th>Title:<td><br>
  <tr>
  <th colspan=2><input value="${currentPlayer.defaultTemplate.defaultName}" style="width: 100%" id="templateNameInput"
    onkeyup="onTemplateSpecsChange()">
  <tr><td style="text-align: left;" class="small"><button onclick="$('templateNameInput').value = (currentPlayer.defaultTemplate.codeName);onTemplateSpecsChange()">AutoName</button><br>
  <button class="shortcut" onclick="queueOnClick(this)" style="margin-top: 2px">Queue</button>Shift: 5x
  <font color="red" style="display:none; font-weight: normal">Invalid Template</font>
  <td class="small">
  Key: D <button class="shortcut" onclick="deployOnClick(this)" data-key='d'>Deploy</button>
  <font color="red" style="display:none">Invalid Template</font>
  <font color="blue" style="display:none">Select city</font>
  <button data-custom-sound onclick="convertSelectedOnClick(this)" style="margin-top: 2px">Convert</button>
  <font style="display: none;"></font>
  <tr><th><td>
  <button onclick="saveTemplateOnClick(this)">Save</button>
  </table>
  <br><header>Saved Templates</header><br>
  <table class="statistic">
  ${renderSavedTemplates()}
  </table>
  <br><header>Divisions in Queue</header><br>
  ${renderQueueInfo()}
  <button onclick="queueLocOnClick(this)">Select Location</button>
  <font color="blue" style="display:none">Select city</font>
  ${currentPlayer.queueDist ? `<a href="#" onclick="pt${currentPlayer.queueDist.toString()}.td.scrollIntoViewIfNeeded();pt${currentPlayer.queueDist.toString()}.td.style.background = 'rgba(0, 0, 0, 0.4)';">` + currentPlayer.queueDist.toString() + ' Urbun</a>' : 'None'}
  <br>
  <button onclick="deployALlOnClick()" style="margin-top: 2px">Deploy All</button> <button onclick="clear_queue();updateDeploy()" style="margin-top: 2px">Delete all</button>
  <br>
  <table class="statistic">
  ${renderQueueList()}
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

function renderQueueInfo() {
  let i = queue_info();
  let buffer = `
  <p style="font-size: 14px;line-height: 1.5em">
  <b>${i.d}</b> divisions in queue<br>
  <b>${i.l} / ${i.nl}</b> light, <b>${i.h} / ${i.nh}</b> heavy<br>
  <b>${abbreviate(i.t, 2, false, false)}/${abbreviate(i.nt, 2, false, false)}</b> men<br>
  Delivery date: <b>${new Date(i.delivery * 1000).toLocaleDateString("en-US")}</b><br>
  Recommend <b style="cursor:pointer" onclick="currentPlayer.factoryInLight = ${i.recLightFactory};if(this.parentElement.parentElement.id=='queueInfoArea')updateLogistics()">${i.recLightFactory}</b> factories in light
  </p>
  `;
  return buffer;
}


function renderQueueList() {
  let buffer = '';
  currentPlayer.queue.forEach((q, i) => {
    let lh = q.l + q.h;
    let nlh = q.nl + q.nh;
    buffer += `<tr><th style="text-align: center;max-width: 20px;"><span class="fraction" title="Light equipments"><span>${q.l}</span><span>${q.nl}</span></span>
    <th style="text-align: center;max-width: 20px;"><span class="fraction" title="Heavy equipments"><span>${q.h}</span><span>${q.nh}</span></span>
    <th style="vertical-align: middle;">${q.tem.defaultName}
    <div style="background: rgb(145,205,16);width: ${lh/nlh*100}%;height: 3px"></div>
    <td width="100px">
	<button onclick="del_queue(${i});updateDeploy()">❌</button>` +
	`<button style="vertical-align: top;font-size: 20px;" ${queue_deployable(i) ? '' : 'disabled'} onclick="deploy_queue(${i});updateDeploy();repaintCanvas()">D</button>`;
  });
  return buffer;
}
