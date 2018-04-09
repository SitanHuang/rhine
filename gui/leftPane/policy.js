function onRetreatableRatioChange(slider) {
  let value = (parseInt(slider.value) / 100).round(2);
  currentPlayer.retreatable = value;
  $('retreatPolicySpan').innerText = value + '%'
}

function updatePolicy() {
  setLeftPaneActiveTab(1);
  $left_content.innerHTML = `
  <br><strong>Retreat Policy</strong><br>
  <input type="range" min="0" max="10000" value="${currentPlayer.retreatable * 100}" class="slider"
    oninput="onRetreatableRatioChange(this)">
  <p>Divisions will retreat if less than <strong id="retreatPolicySpan">${currentPlayer.retreatable}%</strong> of men are left.<br>
  Units will not also attack if the condition is met.</p>
  `;
}
