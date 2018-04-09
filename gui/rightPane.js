window.SELECTED_UNITS = [];

const $right_content = $('right-content');

function showDivisionDetailOnFloat(i, td) {
  let div = SELECTED_UNITS[i];
  let buffer = `
  <u><b>${div.name}</b></u><br><br>
  <table class="statistic">
  <tr><th>HP
  <td>${div.hp.round(2)}%<br>(reinforced ${abbreviate(div.newInforced, 2, false, false)})
  <tr><th>Entrenchment
  <td>${div.entrench.round(1)}
  <tr><th>Skill
  <td>${div.skill.round(2)}
  <tr><th>Surround Penalty
  <td>-${div.adjacentPenalty/4*100}%
  <tr><th>Supply
  <td>${div.supply}
  <tr><th><br><td><br>
  <tr><th><u> Specs </u><td class="small"><u>(Terrain ${div.loc.terrain.name})</u>
  <tr><th>Soft Attack
  <td>${abbreviate(div.soft, 2, false, false)}
  <tr><th>Hard Attack
  <td>${abbreviate(div.hard, 2, false, false)}
  <tr><th>Speed
  <td>${div.speed.round(2)}${SPEED_UNIT}
  <tr><th>Manpower
  <td>${abbreviate(div.men, 2, false, false)}/${abbreviate(div.template.manpower, 2, false, false)}
  <tr><th>Light Equipments
  <td>${abbreviate(div.template.light, 2, false, false)}
  <tr><th>Heavy Equipments
  <td>${abbreviate(div.template.heavy, 2, false, false)}
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

function repaintRightList() {
  removeFloatingDIV();
  tempRightListScrollTop = $right_content.scrollTop;
  let buffer = '';
  SELECTED_UNITS = SELECTED_UNITS.uniq();
  SELECTED_UNITS.forEach((div, i) => {
    buffer += `
    <tr>
    <td onmouseover="showDivisionDetailOnFloat(${i}, this)" onmouseout="removeFloatingDIV()">${div.name}
    <td><button onclick="removeDivisionFromList(${i})">❌</button>
    <tr>
    <td class="hp"><div style="width: ${div.hp}%;background: ${getColorFromPercentage(div.hp/100)}"></div>
    <td>
    `;
  })
  $right_content.innerHTML = `
  <table class="divisions">
  <tr>
  <td>
  <td><button onclick="removeAllSelectedDivisions()">❌ all</button>
  ${buffer}</table>
  `;
  $right_content.scrollTop = tempRightListScrollTop;
  repaintCanvas(td => {
    DEFAULT_REPAINTCANVAS_CALLBACK(td);
    if (SELECTED_UNITS.filter(x => x.loc.eq(td.pt)).length)
      td.style.backgroundColor = td.style.backgroundColor.replace('0.2', '0.7');
  })
}

function updateRightPaneOnPass() {
  SELECTED_UNITS = [];
  repaintRightList();
}
