const $left = $('left');
const $right = $('right');
const $map_container = $('map-container');

window.colCallback = null;
window.colRightClickCallback = null;

function updateInterfaceOnPass() {
  updateLeftPaneOnPass();
  updateRightPaneOnPass();
}

function removeFloatingDIV() {
  for (let div of document.getElementsByClassName('floating')) {
    div.remove();
  }
}

function createFloatingDIV(text, clientX, clientY) {
  let div = document.createElement('div');
  div.className = 'floating';
  div.innerHTML = text;
  div.style.top = clientY;
  div.style.left = clientX;
  document.body.appendChild(div);
  return div;
}

let shiftDown = false;

window.onkeyup = function (evt) {
  evt = evt || window.event;
  shiftDown = evt.shiftKey;
}

window.onkeydown = function (evt) {
  if (evt.keyCode == 27) {
    SELECTED_UNITS.pop();
    repaintRightList();
    return false;
  }
  let tagName = document.activeElement.tagName.toLowerCase();
  if (tagName == 'input') return;
  evt = evt || window.event;
  shiftDown = evt.shiftKey;
  var charCode = evt.which || evt.keyCode;
  var charStr = String.fromCharCode(charCode).toUpperCase();
  for (button of document.getElementsByClassName('shortcut')) {
    if (button.dataset.key && button.dataset.key.toUpperCase() == charStr) {
      button.onclick();
      evt.preventDefault();
      return false;
    }
  }
};
