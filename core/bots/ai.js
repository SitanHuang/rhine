ARMY_COLORS = ['#4a148c', '#b71c1c', '#0d47a1', '#109020', '#827717', '#e65100',
  '#302f2f'];
  
class Ai {
  constructor(player) {
    this.player = player;
    this.reCalc();
  }
  
  handleBudget() {
    let budget = {
      newRecruits: [],
      airStrike: []
    };
    // save 10%
    let available = (Math.min(this.player.light, this.player.heavy) * 0.9).floor().min(0);
    let rate = 1;
    //if (this.player.divisions < 150) rate = 1;
    //else if (this.player.divisions < 250) rate = 0.9;
    //else if (this.player.divisions < 300) rate = 0.6;
    //else rate = 0.4;
    if (this.player.divisions > 250) rate = 0.4;
    
    if (this.isLosingPopulation()) rate = 0;
    
    budget.newRecruits = [(available * rate).floor(), (available * rate).floor()];
    budget.airStrike = (available - budget.newRecruits[0]) / 20;
    
    return budget;
  }
  
  isLosingPopulation() {
    return this.player._populationData.net < -2500;
  }

  reCalc() {
    let player = this.player;
    this.cities = [];
    this.adjacentBlocks = [];
    let budget = this.handleBudget();
    let airStrikedCount = 0;
    
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
          if (Math.random() > 0.7 && player.constructionPoints > 350 && !prov
            .fort && prov.terrain == 'U') {
            player.constructionPoints -= 150;
            prov.fort = true;
          }
          if (!prov.divisions.length || prov.divisions.length && prov.supply > 0.1) this.adjacentBlocks.push(p);
          if (player.factories > 90 && player.light > 10 && player.heavy > 20 && Math.random() > 0.8) {
            p.adjacents((p) => {
              let pro = p.prov;
              if (airStrikedCount++ < budget.airStrike) {
                player.light -= 10;
                player.heavy -= 20;
                airStrikeProv(pro.divisions);
              }
            })
          }
        } else if (prov.terrain == 'U' || prov.terrain == 'P') {
          this.cities.push(p);
          if (prov.terrain == 'P') this.adjacentBlocks.push(p);
          if (player.constructionPoints > 550 && Math.random() > 0.7 &&
            prov.slots.filter(x => (x == 'F')).length < p.terrain.slots) {
            player.constructionPoints -= 550;
            prov.slots.push('F');
          }
          let tem = player.defaultTemplate.deepClone();
          tem.troop = (Math.random() * 20).round() * 1000 + 10000;
          if (player.divisions < 400) {
            tem.heavy = (budget.newRecruits[1] * Math.random()).round().max(40) + 1;
            tem.light = (budget.newRecruits[0] * Math.random()).round().max(40) + 1;
            tem.support = (tem.light / 2 * Math.random()).round();
            tem.motorized = (tem.heavy / 2 * Math.random()).round();
            
            if (player.divisions < 250 && Math.random() > 0.2) { // need quantity over quality
              tem.troop = (Math.random() * 6).round() * 1000 + 6500;
              tem.heavy = (budget.newRecruits[1] * Math.random()).round().max(11) + 1;
              tem.light = (budget.newRecruits[0] * Math.random()).round().max(15) + 1;
              tem.support = (tem.light / 2 * Math.random()).round();
              tem.motorized = (tem.heavy / 2 * Math.random()).round();
            }
            
            while ((tem.heavy -= 1) > 5 && (tem.light -= 1) > 5) {
              tem.defaultName = tem.codeName;
              tem.support = tem.support.max((tem.light / 2).floor());
              tem.motorized = tem.motorized.max((tem.heavy / 2).floor());
              if (tem.deployable(player) && budget.newRecruits[1] >= tem.heavy + tem.motorized && budget.newRecruits[0] >= tem.light + tem.support) {
                tem.deploy(player, p, tem.codeName);
                budget.newRecruits[1] -= tem.heavy + tem.motorized;
                budget.newRecruits[0] -= tem.light + tem.support;
                player.defaultTemplate = tem;
                break;
              }
            }
          }
        } else {
          if (player.constructionPoints > 1500 & Math.random() > 0.9) {
            if (prov.slots.filter(x => (x == 'F')).length >= p.terrain.slots)
              break;
            player.constructionPoints -= 550;
            prov.slots.push('F');
          }
        }
      }
    }
    
    player.retreatable = 0;
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
    let currentNavalInvasion = null;

    for (let row = 0; row < MAP_DATA.length; row++) {
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player || prov.terrain == '@') continue;
        prov.divisions.forEach(div => {
          if (div.color == 'black') return;
          div.color = ARMY_COLORS[(dai++ / dainterval).floor().min(0)] ||
            'transparent';
          if (div.skill < 0.8) {
            div.action = [];
            return;
          }
          if (div.supply <= 0 && div.men < 10000 && Math.random() > 0.3) {
            SELECTED_UNITS.push(div);
            return;
          }
          /*if ((div.skill > 1.5 && div.morale < 0.5 && (div.hp < 25 || div.morale <=
              0.25) && Math.random() > 0.7) ||
            (player.divisions > 200 && player.averageStrength < 76 && div
              .hp < 60 && Math.random() > 0.75) && (player.divisions > 100 || Math.random() > 0.9)) {
            if (player.divisions > 150)
              SELECTED_UNITS.push(div);
            return;
          }*/
          let retreatable = 60;
          if (player._populationData.net < 0 && Math.random() > 0.05 && div.action.length && div.action[0].prov.owner != player.playerID) {
            if (!div.action[0] && div.action[
              0]._navalInvasion)
              div.action = [];
            return;
          } else if (div.action.length > 0 ||
            (prov.terrain == 'U' && prov.divisions.length < 5 && Math.random() >
              0.5)) {
            let lastAction = div.action.last();

            if ((div.battleInfo.length && combineBattleInfos(div.battleInfo)[
                0] < 0.3) /*||
              (lastAction && lastAction.owner == player && lastAction.prov
                .divisions.length > 3)*/) {
              div.action = [];
              return;
            }
          } else if (div.prov.terrain == 'P' && Math.random() > 0.6) {
            // skip
          } else if (div.hp > retreatable && div.action[0] && div.action[
              0]._navalInvasion) {
            // skip
          } else if (div.hp > 90 && div.entrench > 1.5 && prov.terrain == 'P' && Math.random() >
            0.5 && player.light > 60 && player.heavy > 120) {
            let enemy = PORTS.filter(x => ((x.owner != currentPlayer || x.adjacentNotToPlayer(
              player)) && !x.eq(div.loc))).sort((x, y) => (Math.random() - 0.5));
            let landed = PORTS.filter(x => (x.owner == currentPlayer && x.adjacentNotToPlayer(
              player) && !x.eq(div.loc))).sort((x, y) => (Math.random() - 0.5));
            let dest = Math.random() < 0.7 ? landed[0] || enemy[0] : enemy[0];
            currentNavalInvasion = currentNavalInvasion || dest;
            if (currentNavalInvasion) {
              div.action = [currentNavalInvasion.navalInvasion];
              player.light -= 20;
              player.heavy -= 40;
            }
          } else if (div.adjacentNotToPlayer > 0 && (div.adjacentNotToPlayer <
              2 || Math.random() > 0.65) &&
            (div.hp > 40)) {
            div.action = [];
            if ((div.hp > 60 || div.skill > 1.1) && div.morale > 0.8)
              div.loc.adjacents(adj => {
                if (div.action.length) return;
                let divs = adj.prov.divisions;
                if (adj.owner != player && ((divs.length == 0 && Math.random() >
                    0.60) || (divs.length == 0 && Math.random() >
                    0.25 && prov.divisions.length > 2) || (divs.length &&
                    divs.sample().soft <= div.soft)))
                  div.action = [adj];
              });
            //else if ((div.morale < 1 && div.entrench > 1.5) || (div.morale >= 1 && div.entrench > 1.1))
            else
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
                  div.action = [leastDst];
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
