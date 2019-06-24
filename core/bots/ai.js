ARMY_COLORS = ['#4a148c', '#b71c1c', '#0d47a1', '#109020', '#827717', '#e65100',
  '#302f2f'];
class Ai {
  constructor(player) {
    this.player = player;
    this.reCalc();
  }

  reCalc() {
    let player = this.player;
    this.cities = [];
    this.adjacentBlocks = [];
    let order = Math.random() > 0.5;
    for (let row = order ? 0 : MAP_DATA.length - 1; order ? (row < MAP_DATA.length) :
      (row >= 0); order ? row++ : row--) {
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player || prov.terrain == '@') continue;
        if (prov.divisions.length && prov.divisions[0].supply == 0) continue;
        if (prov.adjacentNotToPlayer > 0) {
          if (Math.random() > 0.6 && player.constructionPoints > 350 && !prov
            .fort && prov.terrain == 'U') {
            player.constructionPoints -= 250;
            prov.fort = true;
          }
          this.adjacentBlocks.push(p);
          if (player.light > 10 && player.heavy > 20 && Math.random() > 0.8) {
            p.adjacents((p) => {
              let pro = p.prov;
              if (p.owner != player && pro.divisions.length > 3 && player
                .light > 10 && player.heavy > 20 &&
                Math.random() > 0.5) {
                player.light -= 10;
                player.heavy -= 20;
                airStrikeProv(pro.divisions);
              }
            })
          }
        } else if (prov.terrain == 'U' || prov.terrain == 'P') {
          this.cities.push(p);
          if (prov.terrain == 'P') this.adjacentBlocks.push(p);
          if (player.constructionPoints > 750 && Math.random() > 0.7 &&
            prov.slots.filter(x => (x == 'F')).length < p.terrain.slots) {
            player.constructionPoints -= 750;
            prov.slots.push('F');
          }
          let tem = player.defaultTemplate.deepClone();
          tem.troop = (Math.random() * 24).round() * 1000 + 6000;
          if (player.recruitable > tem.troop * 100 && player.divisions *
            10000 < player.manpower &&
            player.divisions < 400 &&
            Math.random() > 0.5) {
            tem.heavy = (player.heavy * Math.random()).round().max(40) + 1;
            tem.light = (tem.heavy * Math.random() * Math.random()).round().max(30) + 1;
            while ((tem.heavy -= 1) > 10 && (tem.light -= 1) > 5) {
              tem.defaultName = tem.codeName;
              if (tem.deployable(player)) {
                tem.deploy(player, p, tem.codeName);
                player.defaultTemplate = tem;
                break;
              }
            }
          }
        } else {
          if (player.constructionPoints > 1500 & Math.random() > 0.9) {
            if (prov.slots.filter(x => (x == 'F')).length >= p.terrain.slots)
              return;
            player.constructionPoints -= 750;
            prov.slots.push('F');
          }
        }
      }
    }

    this.adjacentBlocks = this.adjacentBlocks.sort((p1, p2) => {
      // p.prov.terrain == 'U' ? -0.1 : p.prov.divisions.length
      let a = p1.prov.terrain == 'U' ? (p1.prov.slots.length) : 55 + p1.prov
        .divisions.length + Math.random();
      let b = p2.prov.terrain == 'U' ? (p2.prov.slots.length) : 55 + p2.prov
        .divisions.length + Math.random();
      return a - b
    });

    player.retreatable = ((100 - player.averageStrength) + 5).round(2).min(10)
      .max(40);
    player.factoryInLight = Math.floor(player.factories * (player.heavy / (
      player.heavy + player.light + 1))).min(1).max(player.factories);
    if (player.light < 0)
      player.factoryInLight = player.factories;
  }

  think() {
    let start = new Date().getTime();
    this.reCalc();
    this.assignUnits();
    this.assignGenerals();
    console.log(
      `Think ${this.player.playerID}: finished in ${new Date().getTime() - start}ms`
    )
  }

  assignGenerals() {
    // let player = this.player;
    // Object.keys(player.generals).forEach(key => {
    //   let max = key == 'Generalissimo' ? 1 : 3;
    //   let num = 0;
    //   Object.values(player.generals[key]).forEach(x => {
    //     x.selected = max <= num ? false : (Math.random() < 3/5 ? !!(++num) : false);
    //   })
    // })
  }

  assignUnits() {
    let units = [];
    let player = this.player;
    let that = this;
    SELECTED_UNITS = [];
    let dai = 0;
    let dainterval = player.divisions.min(1) / ARMY_COLORS.length;

    for (let row = 0; row < MAP_DATA.length; row++) {
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player || prov.terrain == '@') continue;
        prov.divisions.forEach(div => {
          div.color = ARMY_COLORS[(dai++ / dainterval).floor().min(0)] ||
            'transparent';
          if (div.skill < 1 && div.template.troop <= MINIMAL_TEMPLATE.troop) {
            div.action = [];
            return;
          }
          if (div.supply <= 0 && div.men < 10000 && Math.random() > 0.3) {
            SELECTED_UNITS.push(div);
            return;
          }
          if ((div.skill < 1.25 && div.morale < 1 && (div.hp < 25 || div.morale <=
              0.25) && Math.random() > 0.7) ||
            (player.divisions > 200 && player.averageStrength < 76 && div
              .hp < 60 && Math.random() > 0.75) && (player.divisions > 100 || Math.random() > 0.9)) {
            SELECTED_UNITS.push(div);
            return;
          }
          let retreatable = 60;
          if (player.manpower < 1500000 && Math.random() > 0.3 && div.adjacentNotToPlayer >
            0) {
            div.action = [];
            return;
          } else if (div.action.length > 0 ||
            (prov.terrain == 'U' && prov.divisions.length < 5 && Math.random() >
              0.5)) {
            let lastAction = div.action.last();

            if (div.hp < retreatable ||
              (div.battleInfo.length && combineBattleInfos(div.battleInfo)[
                0] < 0.5) ||
              (lastAction && lastAction.owner == player && lastAction.prov
                .divisions.length > 3)) {
              div.action = [];
              return;
            }
          } else if (div.hp > retreatable && div.action[0] && div.action[
              0]._navalInvasion) {
            // skip
          } else if (div.hp > 90 && prov.terrain == 'P' && Math.random() >
            0.5 && player.light > 20 && player.heavy > 40) {
            let enemy = PORTS.filter(x => ((x.owner != currentPlayer || x.adjacentNotToPlayer(
              player)) && !x.eq(div.loc))).sort((x, y) => (Math.random() - 0.5));
            let landed = PORTS.filter(x => (x.owner == currentPlayer && x.adjacentNotToPlayer(
              player) && !x.eq(div.loc))).sort((x, y) => (Math.random() - 0.5));
            let dest = Math.random() < 0.7 ? landed[0] || enemy[0] : enemy[0];
            if (dest) {
              div.action = [dest.navalInvasion];
              player.light -= 20;
              player.heavy -= 40;
            }
          } else if (div.adjacentNotToPlayer > 0 && (div.adjacentNotToPlayer <
              2 || Math.random() > 0.65) &&
            (div.hp > 60)) {
            div.action = [];
            if ((div.hp > 90 || div.skill > 1.75) && div.morale > 0.9)
              div.loc.adjacents(adj => {
                if (div.action.length) return;
                let divs = adj.prov.divisions;
                if (adj.owner != player && ((divs.length == 0 && Math.random() >
                    0.60) || (divs.length == 0 && Math.random() >
                    0.25 && prov.divisions.length > 2) || (divs.length &&
                    divs.sample().soft <= div.soft)))
                  div.action = [adj];
              });
            else if ((div.morale < 1 && div.entrench > 1.5) || (div.morale >= 1 && div.entrench > 1.1))
              // div.loc.adjacents(adj => {
              //   if (div.action.length) return;
              //   let divs = adj.prov.divisions;
              //   if (adj.owner != player && divs.length && divs[0].soft <= div.soft)
              //     div.action = [adj];
              // });
              p.adjacents(adj => {
                if (div.action.length) return;
                let divs = adj.prov.divisions;
                if (adj.owner != player && divs.length && divs[0].soft <=
                  div.soft && div.entrench > 1.5)
                  div.action = [adj];
                else if (prov.terrain != 'U' && prov.terrain != 'P') {
                  let leastNum = prov.divisions.length;
                  let leastDst = p;
                  p.adjacents(a => {
                    let sum = 0;
                    a.prov.divisions.forEach(d => {
                      sum += (d.soft + d.hard);
                    })
                    if (a.owner == player && sum <= leastNum) {
                      leastNum = sum;
                      leastDst = a;
                    }
                  });
                  if (leastDst != location) div.action = [leastDst];
                  else div.action = [];
                }
              });
          } else
            units.push(div);
        });
      }
    }

    if (SELECTED_UNITS.length) {
      console.log(
        `Player ${player.playerID} disbanded ${SELECTED_UNITS.length} units`
      );
      player.defaultTemplate = MINIMAL_TEMPLATE.deepClone();
      convertSelectedOnClick(null);
    }

    let i = 0;
    this.units = units;

    while (units.length) {
      if (++i >= this.adjacentBlocks.length) i = 0;
      let end = that.adjacentBlocks[i];
      if (!end) break;
      units = units.sort((x2, x1) => (Math.abs(x1.loc.row - end.row) + Math.abs(
        x1.loc.col - end.col)) - (Math.abs(x2.loc.row - end.row) + Math.abs(
        x2.loc.col - end.col)));
      let div = units.pop();
      let start = div.loc;
      //u.forEach(div => {
      div.action = unit_pathfind(start, end);
      if (div.action.filter(x => (x.prov.owner != currentPlayerID)).length >
        4)
        div.action = [];
      //})
    }
  }
}
