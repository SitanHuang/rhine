class Ai2 extends Ai {

  think() {
    let start = new Date().getTime();
    this.reCalc();
    this.assignUnits();
    this.assignGenerals();
    console.log(
      `AI2 ${this.player.playerID}: finished in ${new Date().getTime() - start}ms`
    )
  }

  reCalc() {
    let player = this.player;
    this.cities = [];
    this.airStrikeTargets = [];
    SELECTED_UNITS = [];
    this.adjacentBlocks = [];
    this.enemyCities = [];

    let budget = this.budget = this.handleBudget();
    let queueInfo = queue_info();

    let order = Math.random() > 0.5;
    for (let row = order ? 0 : MAP_DATA.length - 1; order ? (row < MAP_DATA.length) :
      (row >= 0); order ? row++ : row--) {
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player) {
          if (diplomacy_get(player.playerID, prov.owner).status == "WAR") {
            if (((prov.terrain == 'U' || prov.terrain == 'P') && prov.divisions.length >= 3) || prov.divisions.length >= 5)
              this.airStrikeTargets.push(prov);
            if (prov.terrain == 'U')
              this.enemyCities.push(p);
          }
          continue;
        }
        if (prov.terrain == '@') continue;

        if (prov.divisions.length && prov.divisions[0].supply == 0) {
          prov.divisions.forEach(x => SELECTED_UNITS.push(x))
          continue;
        }

        if (adjacentNotToPlayerDiplomacy(prov.pt, player)) {
          if (Math.random() > 0.7 && player.constructionPoints > 350 && !prov
            .fort && prov.terrain == 'U') {
            player.constructionPoints -= 150;
            prov.fort = true;
          }
          if (prov.supply > 0.01) this.adjacentBlocks.push(p);
        } else if (prov.terrain == 'U' || prov.terrain == 'P') {
          this.cities.push(p);
          if (prov.terrain == 'P') this.adjacentBlocks.push(p);
          if (player.constructionPoints > 550 && Math.random() > 0.7 &&
            prov.slots.filter(x => (x == 'F')).length < p.terrain.slots) {
            player.constructionPoints -= 550;
            prov.slots.push('F');
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

    let lowestStack = 1;
    this.adjacentBlocks = this.adjacentBlocks.sort((p1, p2) => {
      lowestStack = Math.min(p1.prov.divisions.length, lowestStack).min(1);
      return p1.prov.divisions.length / TERRAINS[p1.prov.terrain].width - p2.prov.divisions.length / TERRAINS[p2.prov.terrain].width;
    }).filter(x => x.prov.divisions.length < (Math.sqrt(lowestStack) * 10) || Math.random() < 0.1);

    this.manageTemplates();
    this.manageQueue();

    player.retreatable = 0;
    player.factoryInLight = (Math.floor(player.factories * (player.heavy /  // old way
      (player.heavy + player.light + 1))).min(1).max(player.factories) * (budget.rate / 100) +
      queueInfo.recLightFactory * (1 - budget.rate / 100)).round().min(1).max(player.factories); // new way
    if (player.light < 0) player.factoryInLight = player.factories;
    else if (player.heavy < 0) player.factoryInLight = Math.min(player.factories, 1);

    if (player.queue.length > 40 && player.divisions > 150) clear_queue();
    if (player.light < -500 || player.heavy < -500) clear_queue();
    deploy_all_queue();
  }

  assignUnits() {
    let units = [];
    let player = this.player;
    let that = this;
    SELECTED_UNITS = [];
    let attackAirStrikes = [];
    let plannedAttacks = [];
    let currentNavalInvasion = null;
    let losingPop = this.isLosingPopulation();

    let avgDist = 0;
    let avgDistLgth = 0;

    for (let row = 0; row < MAP_DATA.length; row++) {
      let rowData = MAP_DATA[row];
      for (let col = 0; col < rowData.length; col++) {
        let p = pt(row, col);
        let prov = p.prov;
        if (p.owner != player || prov.terrain == '@') continue;
        prov.divisions.forEach(div => {
          if (div.color == 'black') return;
          if (div.armored && div.armor > 0.7 && div.template.troop > 9000) div.color = ARMY_COLORS[1];
          else if (div.armored && div.template.troop > 9000) div.color = ARMY_COLORS[5];
          if (div.supply <= 0 && div.adjacentPenalty >= 3 && Math.random() > 0.3) {
            SELECTED_UNITS.push(div);
            return;
          }
          if ((div.skill > 1.2 && div.morale < 0.5 && (div.hp < 25 || div.morale <=
              0.27) && Math.random() > 0.7) ||
            (player.averageStrength < 76 && div.hp < 60 && Math.random() > 0.75)) {
            if (player.divisions > 350)
              SELECTED_UNITS.push(div);
            return;
          }
          let adjacentNotToPlayer = div.adjacentNotToPlayer;
          let retreatable = 60;
          let battleInfo = combineBattleInfos(div.battleInfo);
          if (div.battleInfo.length && ((battleInfo.casualties[0] / battleInfo.casualties[1]) > 2.5 || !PLAYERS[1].ai.attackOrderUntil)) {
            if (div.action[0] && !div.action[
              0]._navalInvasion)
              div.action = [];
              return;
          } else if ((div.prov.terrain == 'P' && Math.random() > 0.55)) {
            // skip
          } else if (div.hp > retreatable && div.action[0] && div.action[
              0]._navalInvasion) {
            // skip
          } else if (div.hp > 80 && prov.terrain == 'P' && player.light > 200 && player.heavy > 300 & player.averageStrength > 75 && (player.divisions > 300 && weather_curve() > 0.7)) {
            let enemy = PORTS.filter(x => ((x.owner != currentPlayer || x.adjacentNotToPlayer(
              player)) && !x.eq(div.loc))).sort((x, y) => (Math.random() - 0.5));
            let landed = PORTS.filter(x => (x.owner == currentPlayer && x.adjacentNotToPlayer(
              player) && !x.eq(div.loc))).sort((x, y) => (Math.random() - 0.5));
            let dest = Math.random() < 0.7 ? landed[0] || enemy[0] : enemy[0];
            currentNavalInvasion = currentNavalInvasion || dest;
            if (currentNavalInvasion) {
              div.action = [currentNavalInvasion.navalInvasion];
              player.light -= 10;
              player.heavy -= 15;
            }
          } else if (adjacentNotToPlayer && prov.divisions.length >= adjacentNotToPlayer) {
            let added = false;
            p.adjacents(adj => {
              if (adj.terrain == '@') return;
              let divs = adj.prov.divisions;
              if (adj.owner != player) {
                let absDiff = divs.map(x => {
                  let def = x.hardDefense * (div.hardness);
                  def += x.softDefense * (1 - div.hardness);

                  def = Math.sqrt(def);

                  let atk = Math.sqrt((
                    div.hardAttack * (x.hardness) + div.softAttack * (1 - x.hardness)
                  ) * (div.supply.max(1) * 0.7 + 0.3));

                  if (div.armor > x.armor && div.armored) {
                    def /= 4; // attacking deals additional 50% damage
                  } else if (x.armor) {
                    atk /= 2;
                  }

                  return def / atk;
                }).reduce((a, b) => a + b, 0)
                ;
                if (divs.length)
                  absDiff /= divs.length;

                if (absDiff <= 0.1) {
                  div.action = [adj];
                  added = true;
                } else if (absDiff < 1.1) {
                  let dist = 100;
                  for (let p of that.enemyCities) {
                    dist = Math.min(dist, Math.pow(p.row - adj.row, 2) + Math.pow(p.col - adj.col, 2));
                  }
                  avgDist += dist;
                  avgDistLgth++;
                  plannedAttacks.push([div, adj, absDiff, dist]);
                  added = true;
                }
              }
            });
            if (!added)
              units.push(div);
          } else
            units.push(div);
        });
      }
    }

    avgDist /= avgDistLgth;
    if (avgDist && avgDist != Infinity)
      plannedAttacks.forEach(x => x[2] += (x[3] / avgDist) * 0.25);

    let rate = _weather.defenseCx < 1 ? (losingPop ? 0.6 : 0.8) : (losingPop ? 0.15 : 0.3);
    let maxAttacks = Math.min(plannedAttacks.length, Math.floor(plannedAttacks.length * rate));
    plannedAttacks = plannedAttacks.sort((a, b) => a[2] - b[2]);
    for (let i = 0;i < plannedAttacks.length;i++) {
      let attack = plannedAttacks[i];
      if (i >= (maxAttacks - 1)) {
        units.push(attack[0]);
      } else {
        attack[0].action = [attack[1]];
        attackAirStrikes.push(attack[1].prov);
      }
    }

    if (SELECTED_UNITS.length) {
      console.log(
        `Player ${player.playerID} disbanded ${SELECTED_UNITS.length} units`
      );
      player.defaultTemplate = MINIMAL_TEMPLATE.deepClone();
      disableSound = true;
      convertSelectedOnClick(null);
      disableSound = false;
    }

    let i = -1;
    this.units = units;
    this.plannedAttacks = plannedAttacks;

    while (units.length) {
      if (++i >= this.adjacentBlocks.length) i = 0;
      let end = that.adjacentBlocks[i];
      if (!end) break;
      units = units.sort((x2, x1) => (Math.pow(x1.loc.row - end.row, 2) + Math.pow(
        x1.loc.col - end.col, 2)) - (Math.pow(x2.loc.row - end.row, 2) + Math.pow(
        x2.loc.col - end.col, 2)));
      let div = units.pop();
      let start = div.loc;
      //u.forEach(div => {
      div.action = unit_pathfind_friendly_only(start, end);
      if (!div.action.length)
        div.action = unit_pathfind(start, end);
      if (div.action.filter(x => (x.prov.owner != currentPlayerID)).length >
        4)
        div.action = [];
      //})
    }

    this.airStrikeTargets = this.airStrikeTargets
      .sort((a, b) => b.divisions.map(x => x.template.troop).reduce((a, b) => a + b, 0) - a.divisions.map(x => x.template.troop).reduce((a, b) => a + b, 0));
    attackAirStrikes = attackAirStrikes
      .sort((a, b) => b.divisions.map(x => x.template.troop).reduce((a, b) => a + b, 0) - a.divisions.map(x => x.template.troop).reduce((a, b) => a + b, 0));

    this.airStrikeTargets = attackAirStrikes.concat(this.airStrikeTargets);

    let airStrikedCount = 0;
    for (let prov of this.airStrikeTargets) {
      if (airStrikedCount++ < this.budget.airStrike) {
        player.light -= 5;
        player.heavy -= 10;
        airStrikeProv(prov.divisions);
      }
    }
  }
}
