const $left = $('left');
const $right = $('right');
const $map_container = $('map-container');

window.colCallback = null;
window.colRightClickCallback = null;

document.body.style.zoom = window.innerWidth / 1900;

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

document.onkeydown = function(evt) {
  if (document.activeElement.tagName.toLowerCase() != 'body') return;
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    removeAllSelectedDivisions();
    return false;
  }
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
