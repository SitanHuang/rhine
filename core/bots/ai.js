class Ai {
  constructor(player) {
    this.player = player;
    this.reCalc();
  }

  reCalc() {
    let player = this.player;
    this.cities = [];
    this.adjacentBlocks = [];
    for (let row = 0; row < MAP_DATA.length; row++) {
      for (let col = 0; col < MAP_DATA[row].length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player) continue;
        if (p.adjacentNotToPlayer(player) > 0) {
          this.adjacentBlocks.push(p);
        } else if (prov.terrain == 'U') {
          this.cities.push(p);
          this.adjacentBlocks.push(p);
          if (player.constructionPoints > 750 &&
            prov.slots.filter(x => (x == 'F')).length < p.terrain.slots) {
            player.constructionPoints -= 750;
            prov.slots.push('F');
          }
		  let tem = player.defaultTemplate.deepClone();
          tem.troop = (Math.random() * 20).round() * 1000 + 7000;
          tem.heavy = 35;
          tem.light = 35;
          if (player.recruitable > tem.troop * 10)
            while ((tem.heavy -= (Math.random() * 2).round()) > 0 && (tem.light -= (Math.random() * 1.3).round()) > 0) {
              tem.defaultName = tem.codeName;
              if (tem.deployable(player)) {
                tem.deploy(player, p, tem.codeName);
                player.defaultTemplate = tem;
                break;
              }
            }
        } else {
          if (Math.random() > 0.8 && player.constructionPoints > 750 &&
            prov.slots.filter(x => (x == 'F')).length < p.terrain.slots) {
            player.constructionPoints -= 750;
            prov.slots.push('F');
          }
        }
      }
    }

    this.adjacentBlocks = this.adjacentBlocks.sort(x => (Math.random() - 0.5)).sort((p1, p2) => {
	  // p.prov.terrain == 'U' ? -0.1 : p.prov.divisions.length
	  let a = p1.prov.terrain == 'U' ? -0.1 : p1.prov.divisions.length + Math.random();
	  let b = p2.prov.terrain == 'U' ? -0.1 : p2.prov.divisions.length + Math.random();
	  return a-b
	});

    player.retreatable = ((100 - player.averageStrength) + 15).round(2).min(10).max(50);
    player.factoryInLight = Math.floor(player.factories / 2);
  }

  think() {
    this.reCalc();
    this.assignUnits();
  }

  assignUnits() {
    let units = [];
    let player = this.player;
    let that = this;

    for (let row = 0; row < MAP_DATA.length; row++) {
      for (let col = 0; col < MAP_DATA[row].length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player) continue;
        prov.divisions.forEach(div => {
          if (div.action.length > 0) {
            if (div.hp < Math.max(35, player.retreatable) ||
              (div.battleInfo.length && combineBattleInfos(div.battleInfo)[0] < 0.5) ||
			  (div.action.last() && div.action.last().owner == player && div.action.last().prov.divisions.length > 3)) {
              div.action = [];
			  units.push(div);
              return;
            }
          } else if (div.loc.adjacentNotToPlayer(player) > 0 &&
            div.hp > Math.max(35, player.retreatable)) {
            div.loc.adjacents(adj => {
              if (adj.owner != player)
                div.action = [adj];
            });
          } else
            units.push(div);
        });
      }
    }

	let i = 0;
    this.units = units;

    let u = null
    i = 0;

    while (units.length) {
      if (++i >= this.adjacentBlocks.length) i = 0;
      let end = that.adjacentBlocks[i];
	  units = units.sort((x1, x2) => ((Math.abs(x1.loc.row - end.row) + Math.abs(x1.loc.col - end.col))-(Math.abs(x2.loc.row - end.row) + Math.abs(x2.loc.col - end.col))));
      let div = units.shift();
      let start = div.loc;
      //u.forEach(div => {
      div.action = unit_pathfind(start, end);
      //})
    }
  }
}
