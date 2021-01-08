var _manpowerData = [];
var _armysizeData = [];
var _armydmgData = [];
var _factoryData = [];
var _casualtiesData = [];

function clearData() {
  _manpowerData = [];
  _armysizeData = [];
  _armydmgData = [];
  _factoryData = [];
  _casualtiesData = [];
}

function updateData() {
  if (_manpowerData.length && _manpowerData[_manpowerData.length - 1].date && _manpowerData[_manpowerData.length - 1].date.getTime() == new Date(timestamp * 1000).getTime()) return;
  let mp = {date: new Date(timestamp * 1000)};
  PLAYERS.forEach((x, i) => mp['p' + i] = (x.manpower / 1000000) || NaN);
  _manpowerData.push(mp);
  mp = {date: new Date(timestamp * 1000)};
  PLAYERS.forEach((x, i) => mp['p' + i] = (x.divisionMen / 1000000) || NaN);
  _armysizeData.push(mp);
  mp = {date: new Date(timestamp * 1000)};
  PLAYERS.forEach((x, i) => mp['p' + i] = (x.divisionDamage / 1000000) || NaN);
  _armydmgData.push(mp);
  mp = {date: new Date(timestamp * 1000)};
  PLAYERS.forEach((x, i) => mp['p' + i] = (x.factories) || NaN);
  _factoryData.push(mp);
  mp = {date: new Date(timestamp * 1000)};
  PLAYERS.forEach((x, i) => mp['p' + i] = (x.casualties / 1000000) || NaN);
  _casualtiesData.push(mp);
}

function startObserveMode() {
  window.observing = true;
  window.politicalView = true;
  jQuery('#right').addClass('auto-collapse');
  $('map-container').style.width = "100%";
  $('left-content').style.display = "none";
}

function observeMode() {

  $('graph-content').style.display = "block";

  let width = $('left').clientWidth;
  let height = width / 350 * 200;
  $('graph-content').innerHTML = `
  <strong>&nbsp;Casualties</strong>
  <div id="casualtiesGraph" style="width: ${width}px;height: ${height}px"></div>
  <strong>&nbsp;Manpower</strong>
  <div id="manPowerGraph" style="width: ${width}px;height: ${height}px"></div>
  <strong>&nbsp;Army Size</strong>
  <div id="armySizeGraph" style="width: ${width}px;height: ${height}px"></div>
  <strong>&nbsp;Factories</strong>
  <div id="factoryGraph" style="width: ${width}px;height: ${height}px"></div>
  <strong>&nbsp;Army Damage</strong>
  <div id="armyDmgGraph" style="width: ${width}px;height: ${height}px"></div>
  `;

  updateData();

  var cChart = d3_timeseries()
    // .yscale.domain([0])
    .width(width)
    .height(height);
  for (let i = 0;i < PLAYERS.length;i++)
    cChart = cChart.addSerie(i == 0 ? _casualtiesData : null,{x:'date',y:'p' + i},{interpolate:'monotone', color: PLAYERS[i].color.replace('0.2', '1')});

  cChart('#casualtiesGraph');
  var mpChart = d3_timeseries()
    // .yscale.domain([0])
    .width(width)
    .height(height);
  for (let i = 0;i < PLAYERS.length;i++)
    mpChart = mpChart.addSerie(i == 0 ? _manpowerData : null,{x:'date',y:'p' + i},{interpolate:'monotone', color: PLAYERS[i].color.replace('0.2', '1')});

  mpChart('#manPowerGraph');
  var asChart = d3_timeseries()
    // .yscale.domain([0])
    .width(width)
    .height(height);
  for (let i = 0;i < PLAYERS.length;i++)
    asChart = asChart.addSerie(i == 0 ? _armysizeData : null,{x:'date',y:'p' + i},{interpolate:'monotone', color: PLAYERS[i].color.replace('0.2', '1')});

  asChart('#armySizeGraph');
  var adChart = d3_timeseries()
    // .yscale.domain([0])
    .width(width)
    .height(height);
  for (let i = 0;i < PLAYERS.length;i++)
    adChart = adChart.addSerie(i == 0 ? _armydmgData : null,{x:'date',y:'p' + i},{interpolate:'monotone', color: PLAYERS[i].color.replace('0.2', '1')});

  adChart('#armyDmgGraph');
  var fChart = d3_timeseries()
    // .yscale.domain([0])
    .width(width)
    .height(height);
  for (let i = 0;i < PLAYERS.length;i++)
    fChart = fChart.addSerie(i == 0 ? _factoryData : null,{x:'date',y:'p' + i},{interpolate:'monotone', color: PLAYERS[i].color.replace('0.2', '1')});

  fChart('#factoryGraph');
}
