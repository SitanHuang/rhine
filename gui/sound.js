var disableSound = false;

function SoundPlayer(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.loop = false;
  this.sound.volumn = 1;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.end = Infinity;

  let that = this;
  this.play = function () {
    if (disableSound) return;
    this.sound.play();
    that.end = Infinity;
  };
  this.stop = function () {
    this.sound.pause();
    that.end = Infinity;
  };
  this.playSprite = function (begin, end) {
    if (disableSound) return;
    that.sound.currentTime = begin;
    that.end = end;
    that.sound.play();
  };
  that.sound.addEventListener('timeupdate', function(ev) {
    if (that.sound.currentTime > that.end) {
      that.sound.pause();
    }
  },false);
  this.play();
}
var buttonsPlayer = new SoundPlayer('gui/music/buttons.webm');
var navyPlayer = new SoundPlayer('gui/music/navy.webm');
var assignPlayer = new SoundPlayer('gui/music/assign.webm');
var startPlayer = new SoundPlayer('gui/music/start.webm');
var convertPlayer = new SoundPlayer('gui/music/convert.webm');
var miscPlayer = new SoundPlayer('gui/music/misc.webm');
