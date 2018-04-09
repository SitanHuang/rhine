const $playerID = $('playerID');
const $left_content = $('left-content');
const $left_tabs = $left_content.parentNode.children[0];

function setLeftPaneActiveTab(num) {
  Array.from($left_tabs.children).forEach(x => (x.className = 'shortcut'));
  $left_tabs.children[++num].className = 'active';
}

function updateLeftPaneOnPass() {
  $playerID.innerText = currentPlayerID;
  updateLogistics();
}
