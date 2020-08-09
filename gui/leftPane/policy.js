function onRetreatableRatioChange(slider) {
  let value = (parseInt(slider.value) / 100).round(2);
  currentPlayer.retreatable = value;
  $('retreatPolicySpan').innerText = value + '%'
}

let tempPolicyListScrollTop = 0;

function updatePolicy() {
  setLeftPaneActiveTab(1);
  tempPolicyListScrollTop = $left_content.scrollTop;
  let sumedTemplate = currentPlayer.sumAllGeneralTraits;
  let html = `
  <br><strong>Retreat Policy</strong><br>
  <input type="range" min="0" max="10000" value="${currentPlayer.retreatable * 100}" class="slider"
    oninput="onRetreatableRatioChange(this)">
  <p>Divisions will retreat if less than <strong id="retreatPolicySpan">${currentPlayer.retreatable}%</strong> of men are left.<br>
  Units will not also attack if the condition is met.</p>
  <br><header>Modifiers</header><br>
  `;
  for (let modName in sumedTemplate) {
    let displayName = modName;
    let mod = sumedTemplate[modName];
    switch (modName) {
      case 'o': displayName = 'Offense'; break;
      case 's': displayName = 'Speed'; break;
      case 'b': displayName = 'Hardness'; break;
      case 'e': displayName = 'Entrench'; break;
    }
    html += `${displayName} <font color="${mod < 1 ? 'red' : 'green'}">x${mod}</font><br>`;
  }
  for (let rankName in currentPlayer.generals) {
    let rank = currentPlayer.generals[rankName];
    html += `<br><header>${rankName}</header><br>
      <table class="statistic" style='margin: 0 -10px;width: calc(100% + 20px);'>`;
    for (let generalName in rank) {
      let general = rank[generalName];
      html += `<tr><th><img src='${general.path}' style="width: 100px;">
        <td><strong>${generalName}</strong><p>${general.desc}</p><pre>`;
      for (let modName in general.mod) {
        let displayName = modName;
        let mod = general.mod[modName];
        if (mod == 1) continue;
        switch (modName) {
          case 'o': displayName = 'Offense'; break;
          case 's': displayName = 'Speed'; break;
          case 'b': displayName = 'Hardness'; break;
          case 'e': displayName = 'Entrench'; break;
        }
        html += `${displayName} <font color="${mod < 1 ? 'red' : 'green'}">x${mod}</font>\n`;
      }
      html += `</pre>
      <button class="${general.selected ? 'active' : ''}"
        onclick='selectGeneralOnClick(this, ${JSON.stringify(rankName)}, ${JSON.stringify(generalName)});'>Select</button>
      <font style="display:none" color=red>Max number reached</font>
      <br><br>`;
    }
    html += '</table>';
  }
  
  
  $left_content.innerHTML = html;
  $left_content.scrollTop = tempPolicyListScrollTop;
}

function selectGeneralOnClick(button, rankName, generalName) {
  button.nextElementSibling.style.display = 'none';
  let rank = currentPlayer.generals[rankName];
  let general = rank[generalName];
  let max = rankName == 'Generalissimo' ? 1 : 3;
  if (!general.selected) {
    if (Object.values(rank).filter(x => x.selected).length + 1 > max) {
      button.nextElementSibling.style.display = 'block';
      return;
    }
  }
  general.selected = !general.selected;
  button.className = general.selected ? 'active' : '';
  updatePolicy();
}