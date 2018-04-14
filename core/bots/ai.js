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
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player || prov.terrain == '@') continue;
        if (prov.adjacentNotToPlayer > 0) {
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
          tem.troop = (Math.random() * 30).round() * 1000 + 7000;
          tem.heavy = (player.light * Math.random()).round();
          tem.light = (player.heavy * Math.random()).round();
          if (player.recruitable > tem.troop * 100) {
            while ((tem.heavy -= 1) > 0 && (tem.light -= 1) > 0) {
              tem.defaultName = tem.codeName;
              if (tem.deployable(player)) {
                tem.deploy(player, p, tem.codeName);
                player.defaultTemplate = tem;
                break;
              }
            }
          }
        } else {
          if (Math.random() > 0.9 && player.constructionPoints > 750) {
            if (prov.slots.filter(x => (x == 'F')).length >= p.terrain.slots) return;
            player.constructionPoints -= 750;
            prov.slots.push('F');
          }
        }
      }
    }

    this.adjacentBlocks = this.adjacentBlocks.sort((p1, p2) => {
      // p.prov.terrain == 'U' ? -0.1 : p.prov.divisions.length
      let a = p1.prov.terrain == 'U' ? (p1.prov.slots.length) : 55 + p1.prov.divisions.length + Math.random();
      let b = p2.prov.terrain == 'U' ? (p2.prov.slots.length) : 55 + p2.prov.divisions.length + Math.random();
      return a - b
    });

    player.retreatable = ((100 - player.averageStrength) + 5).round(2).min(10).max(50);
    player.factoryInLight = Math.floor(player.factories / 2);
  }

  think() {
    let start = new Date().getTime();
    this.reCalc();
    this.assignUnits();
    console.log(`Think ${this.player.playerID}: finished in ${new Date().getTime() - start}ms`)
  }

  assignUnits() {
    let units = [];
    let player = this.player;
    let that = this;

    for (let row = 0; row < MAP_DATA.length; row++) {
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player || prov.terrain == '@') continue;
        prov.divisions.forEach(div => {
          let retreatable = Math.max(35, player.retreatable);
          if (div.action.length > 0 ||
              (prov.terrain == 'U' && prov.divisions.length < 5 && Math.random() > 0.5)) {
                let lastAction = div.action.last();

            if (div.hp < retreatable ||
              (div.battleInfo.length && combineBattleInfos(div.battleInfo)[0] < 0.5) ||
              (lastAction && lastAction.owner == player && lastAction.prov.divisions.length > 3)) {
              div.action = [];
              units.push(div);
              return;
            }
          } else if (div.adjacentNotToPlayer > 0 &&
            div.hp > retreatable) {
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

    while (units.length) {
      if (++i >= this.adjacentBlocks.length) i = 0;
      let end = that.adjacentBlocks[i];
      units = units.sort((x2, x1) => (Math.abs(x1.loc.row - end.row) + Math.abs(x1.loc.col - end.col)) - (Math.abs(x2.loc.row - end.row) + Math.abs(x2.loc.col - end.col)));
      let div = units.pop();
      let start = div.loc;
      //u.forEach(div => {
      div.action = unit_pathfind(start, end);
      //})
    }
  }
}
