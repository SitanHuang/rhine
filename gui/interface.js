const $left = $('left');
const $right = $('right');
const $map_container = $('map-container');

window.colCallback = null;
window.colRightClickCallback = null;

jQuery('#controls button').bind( "click", function() {
    buttonsPlayer.playSprite(10 + 36/60, 10 + 50/60);
  });
  
jQuery('#left .tabs').bind( "click", function() {
    buttonsPlayer.playSprite(8 + 42/60, 8 + 57/60);
});

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
let mouseDown = false;

window.onkeyup = function (evt) {
  evt = evt || window.event;
  if (!(shiftDown = evt.shiftKey)) {
    jQuery($map_container).attr('class', 'dragscroll');
    dragscroll.reset();
  }
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
  if (shiftDown = evt.shiftKey) {
    jQuery($map_container).attr('class', '');
    dragscroll.reset();
  }
  var charCode = evt.which || evt.keyCode;
  var charStr = String.fromCharCode(charCode).toUpperCase();
  if (charStr == 'H') {
    SELECTED_UNITS.length = (SELECTED_UNITS.length / 2).floor();
    repaintRightList();
    return false;
  }
  for (button of document.getElementsByClassName('shortcut')) {
    if (button.dataset.key && button.dataset.key.toUpperCase() == charStr) {
      button.onclick();
      evt.preventDefault();
      return false;
    }
  }
};

window.onmousedown = () => { mouseDown = true  };
window.onmouseup = () => { mouseDown = false  };

jQuery(window).blur(function(){
  shiftDown = mouseDown = false;
}).bind('beforeunload', function(e){
    return false;
});
