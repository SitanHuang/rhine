window.SELECTED_UNITS = [];

const $right_content = $('right-content');

function showDivisionDetailOnFloat(i, td) {
  let div = SELECTED_UNITS[i];
  let buffer = `
  <u><b>${div.name}</b></u><br><br>
  <table class="statistic">
  <tr><th>HP
  <td>${div.hp.round(2)}%<br>(reinforced ${abbreviate(div.newInforced, 2, false, false)}, -${getCasualtyReductionFromSupport(div).round(2)}x)
  <tr><th>Entrenchment
  <td>${div.entrench.round(1)} (x${div.template.entrenchBuff.round(2)})
  <tr><th>Skill
  <td>${div.skill.round(2)}
  <tr><th>Morale
  <td>${div.morale.round(2)}
  <tr><th>Surround Penalty
  <td>-${div.adjacentPenalty/4*100}%
  <tr><th>Supply
  <td>${div.supply.round(2)} (${div.prov.supply?  div.prov.supply.round(2) : ''}x${div.template.supplyBuff.round(2)})
  <tr><th><br><td><br>
  <tr><th><u> Specs </u><td class="small"><u>(Terrain ${div.loc.terrain.name})</u>
  <tr><th>Soft Attack
  <td>${abbreviate(div.soft, 2, false, false)}
  <tr><th>Hard Attack
  <td>${abbreviate(div.hard, 2, false, false)}
  <tr><th>Speed
  <td>${div.speed.round(2)}${SPEED_UNIT}
  <tr><th>Breakthrough
  <td>${div.breakThrough.round(2)}
  <tr><th>Manpower
  <td>${abbreviate(div.men, 2, false, false)}/${abbreviate(div.template.manpower, 2, false, false)}
  <tr><th>Light Equipments
  <td>${abbreviate(div.template.light, 2, false, false)}
  <tr><th>Heavy Equipments
  <td>${abbreviate(div.template.heavy, 2, false, false)}
  <tr><th>Support Equipments
  <td>${abbreviate(div.template.support, 2, false, false)}
  <tr><th>Motorized Equipments
  <td>${abbreviate(div.template.motorized, 2, false, false)}
  </table>
  `;
  createFloatingDIV(buffer, td.getBoundingClientRect().left - 350,
    td.getBoundingClientRect().top.clamp(0, window.innerHeight - 500));
}

function removeDivisionFromList(i) {
  SELECTED_UNITS.splice(i, 1);
  repaintRightList();
}

function removeAllSelectedDivisions() {
  SELECTED_UNITS = [];
  repaintRightList();
}

let tempRightListScrollTop = 0;

function autoFightSelectedOnClick() {
  if (SELECTED_UNITS.length) {
    Ai.autoFight(currentPlayer, SELECTED_UNITS);
    repaintRightList();
  }
}

function rightPaneSetColorOnClick(button) {
  SELECTED_UNITS.forEach(x => {
    x.color = button.style.backgroundColor;
  });
  repaintRightList();
  repaintCanvas();
}

function ArmyViewOnClick() {
  let stylesheet = document.styleSheets[0];
  stylesheet.cssRules[0].style.display = stylesheet.cssRules[0].style.display == 'block' ? 'none' : 'block';
}

function PoliticalViewOnClick() {
  let stylesheet = document.styleSheets[0];
  stylesheet.cssRules[1].style.display = stylesheet.cssRules[1].style.display == 'block' ? 'none' : 'block';
  window.politicalView = !window.politicalView;
  repaintCanvas();
}


function saveGameOnClick() {
  let file = prompt('File name?', 'Saved Game 1.rhine');
  if (!file || !file.length) return;
  let waiting = document.createElement('waiting');
  waiting.innerHTML = '<h1>Processing</h1>';
  document.body.append(waiting);
  setTimeout(function() {
    localStorage['file_' + file] = serializeWorld();
    waiting.remove();
  }, 50);
}

function repaintRightList() {
  removeFloatingDIV();
  tempRightListScrollTop = $right_content.scrollTop;
  let buffer = '';
  SELECTED_UNITS = SELECTED_UNITS.uniq();
  SELECTED_UNITS.forEach((div, i) => {
    let morale = div.morale.max(1.5).min(0) * (100/1.5);
    buffer += `
    <tr>
    <td onmouseover="showDivisionDetailOnFloat(${i}, this)" onmouseout="removeFloatingDIV()"
      onclick="SELECTED_UNITS = [SELECTED_UNITS[${i}]];repaintRightList();">
      <span>${div.skill.floor()}</span> ${div.name}
    <td style="border: 2px solid ${div.color};background: ${div.color}" class="army">
    <td><button onclick="removeDivisionFromList(${i})">❌</button>
    <tr>
    <td class="hp"><div style="width: ${div.hp}%;background: rgb(145,205,16)"></div>
    <td><td>
    <tr>
    <td class="hp"><div style="width: ${morale}%;background: rgb(255,122,0)"></div>
    <td><td>
    `;
  });
  let ds = {};
  let dn = {};
  let sum = 0;
  let highestPerc = 0.0;
  MAP_DATA.forEach(row => {
	row.forEach(col => {
	  if (col.owner == currentPlayerID) {
		col.divisions.forEach(div => {
		  if (div.color) {
			let t = (div.soft + div.hard) * div.breakThrough * div.morale;
			ds[div.color] = ds[div.color] || 0;
			dn[div.color] = dn[div.color] || 0;
			ds[div.color] += t;
			dn[div.color]++;
			sum += t;
		  }
		})
	  }
	})
  });
  Object.getOwnPropertyNames(ds).forEach(color => {
	highestPerc = Math.max(ds[color] / (sum + 0.01), highestPerc);
  });
  let summaryHTML = '';
  Object.getOwnPropertyNames(ds).forEach(color => {
	summaryHTML += `<div style="width: ${ds[color] / (sum + 0.01) / highestPerc * 100}%;background: ${color};height: 5px;"> </div>
	<span>${dn[color]} divs</span><br>
	`;
  });
  $right_content.innerHTML = `
  ${summaryHTML}
  <table class="divisions">
  <tr>
  <td><button onclick="autoFightSelectedOnClick()">AI</button>
  <button onclick="ArmyViewOnClick()">AV</button>
  <button onclick="PoliticalViewOnClick()">PV</button>
  <button onclick="saveGameOnClick()">Save</button>
  <td>
  <td><button onclick="removeAllSelectedDivisions()">❌</button>
  <tr>
  <td style="">
    <button onclick="rightPaneSetColorOnClick(this)" style="background: #4a148c"> </button
    ><button onclick="rightPaneSetColorOnClick(this)" style="background: #b71c1c"> </button
    ><button onclick="rightPaneSetColorOnClick(this)" style="background: #0d47a1"> </button
    ><button onclick="rightPaneSetColorOnClick(this)" style="background: #109020"> </button
    ><button onclick="rightPaneSetColorOnClick(this)" style="background: #827717"> </button
    ><button onclick="rightPaneSetColorOnClick(this)" style="background: #e65100"> </button
    ><button onclick="rightPaneSetColorOnClick(this)" style="background: #302f2f "> </button>
  <td>
  <td><button onclick="rightPaneSetColorOnClick(this)" style="background: transparent ">❌</button>
  ${buffer}</table>
  `;
  $right_content.scrollTop = tempRightListScrollTop;
  // repaintCanvas(td => {
  //   DEFAULT_REPAINTCANVAS_CALLBACK(td);
  //   if (SELECTED_UNITS.filter(x => x.loc.eq(td.pt)).length)
  //     td.style.backgroundColor = td.style.backgroundColor.replace('0.2', '0.7');
  // })
  repaintCanvas(null, true)
}

function updateRightPaneOnPass() {
  SELECTED_UNITS = [];
  repaintRightList();
}
