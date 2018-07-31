Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

Math.oldRound = Math.round;

Math.round = (number, places) => {
  places = places ? Math.max(places, 0) : 0;
  return Math.oldRound(number * Math.pow(10, places)) / Math.pow(10, places);
}

Number.prototype.round = function (places) {
  return Math.round(this, places)
}

Number.prototype.min = function (min) {
  return Math.max(this, min);
}

Number.prototype.max = function (min) {
  return Math.min(this, min);
}

Number.prototype.floor = function () {
  return Math.floor(this);
};

$ = (x) => {
  return document.getElementById(x);
}

String.prototype.deepClone = function () {
  return (' ' + this).slice(1)
}

Array.prototype.uniq = function () {
  return [...new Set(this)];
}
Array.prototype.sample = function () {
  return this[(Math.random() * this.length).floor()];
}

Array.prototype.last = function () {
  return this[this.length - 1];
}

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}
