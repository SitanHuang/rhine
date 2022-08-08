class Division {
  constructor(playerID, name, point, template) {
    if (!name) return;

    this['#'] = 'Division';

    this.playerID = playerID;
    this.name = name;
    this.loc = point;
    this.template = template;
    this.men = this.template.troop;
    this.health = template.troop;
    this.skill = 1;

    this.action = [];
    this.battleInfo = [];
    this.movementProgress = 0;
    this.prov.divisions.push(this);

    this.newInforced = 0;
    this.supply = 4;
    this.entrench = 1;
    this.airStriked = false;

    this.color = 'transparent';

    this.morale = 1;
  }

  reinforce() {
    if (Math.random() < Math.min(2, this.supply) / 5) {
      if (this.hp < 100) {
        let amount = this.template.troop - this.men;
        amount = (Math.min(Math.sqrt(amount * 50), this.player.recruitable / 500) * (this.supply).max(2).min(0)).round();
        this.newInforced += amount;
        this.player.manpower -= amount;

        this.skill = (this.men * this.skill + amount * this.skill.max(1)) / (this.men + amount);

        this.men = (this.men + amount).round().clamp(0, this.template.troop);
      }
    }
    if (this.morale < 1)
      this.morale += 0.2 * this.supply.max(2).min(0);
    else if (this.morale > 1)
      this.morale = (this.morale - 0.1).min(1);
  }

  get hardness() {
    return (this.template.hardness * this.player.tempSumAllGeneralTraits.b).round(2).clamp(0, 0.99);
  }

  move() {
    if (this.skill < 1)
      this.skill += 0.1;

    this.entrench = (this.entrench + 0.25 * this.player.tempSumAllGeneralTraits.e * this.template.entrenchBuff).round(2).clamp(1, 2);
    this.newInforced = 0;
    this.battleInfo = [];
    this.reinforce();

    let player = this.player;
    let that = this;
    this.supply = this.loc.prov.supply * this.template.supplyBuff * _weather.supplyCx;

    if (this.supply.round(3) <= 0) {
      let a = this.men * 0.1;
      this.morale = this.morale.max(0.5);
      this.men = (this.men - a).round().min(0);
      if (this.men <= 900) {
        this.remove();
        return;
      }
      player.casualties += a.round();
    }

    this.action = this.action.filter(x => x.prov.terrain != '@');

    if (this.action.length == 0 || (this.hp < 80 && Math.random() > this.morale * 1.2)) {
      this.movementProgress = 0;
      return;
    }
    this.movementProgress += this.speed * _weather.movementCx;
    while (this.movementProgress >= 1 && this.action.length > 0) {
      let nextPt = this.action[0];
      let nextProv = nextPt.prov;
      if (nextProv.terrain == '@') break;
      let divs = nextProv.divisions;

      if (nextPt.owner != this.player && diplomacy_get(nextPt.owner.playerID, this.playerID).status != 'WAR') {
        this.action = [];
        break;
      } else if (nextPt.owner == this.player || divs.length == 0) {
        if (nextPt.owner == this.player) {
          this.movementProgress -= 1 * _weather.movementCx.max(1);
        } else {
          // new supply is capped at 50% * weather of previous
          // if entering enemy territory
          this.supply = Math.min(
            this.supply * 0.5 * _weather.supplyCx,
            this.loc.prov.supply * this.template.supplyBuff * _weather.supplyCx
          );
          this.movementProgress -= 1 * _weather.movementCx.min(1);
        }
        this.updateLocation(nextPt);

        this.action.shift();
      } else {
        if (that.hp < that.player.retreatable.min(5) || (that.morale < 0.25)) return;

        let reinforcedDivs = [];

        // if (Math.random() < that.reinforceRate)
        nextPt.adjacents(adj => {
          if (adj.terrain == '@') return;
          let divs = adj.prov.divisions;
          if (adj.owner == that.player) {
            for (let i = 0;i < divs.length;i++) {
              let div = divs[i];
              if (div.action[0]?.eq(nextPt) &&
                  div.morale >= .25 &&
                  div.hp >= div.player.retreatable.min(5) &&
                  Math.random() < div.reinforceRate &&
                  div.movementProgress + div.speed * _weather.movementCx >= 1) {
                div.movementProgress -= 1 * _weather.movementCx;
                reinforcedDivs.push(div);
              }
            }
          }
        });

        let atkDiv = that;
        if (reinforcedDivs.length) {
          reinforcedDivs.push(that);
          atkDiv = new ReinforcedDivisionWrapper(reinforcedDivs);
        }

        let maxWidth = nextPt.terrain.width;
        let exceeded = ((nextProv.menAttacking || 0) + atkDiv.men - maxWidth).min(0);
        let widthPenalty = (1 - maxWidth / (exceeded + maxWidth));
        nextProv.menAttacking += atkDiv.men;
        divs.forEach(div => {
          if (atkDiv.hp < that.player.retreatable.min(5) || (atkDiv.morale < 0.25)) return;

          let defReinforcedDivs = [];
          for (let i = 0; i < divs.length; i++) {
            let div2 = divs[i];
            if (div2.morale >= .25 &&
              div2.hp >= div2.player.retreatable.min(5) &&
              Math.random() < div2.reinforceRate) {
              div2.movementProgress = -1;
              defReinforcedDivs.push(div2);
            }
          }

          let defDiv = div;
          if (defReinforcedDivs.length) {
            defReinforcedDivs.push(div);
            defDiv = new ReinforcedDivisionWrapper(defReinforcedDivs);
          }

          div.movementProgress = -1;

          let results = battle(atkDiv, defDiv, widthPenalty, maxWidth);
          // if (div.hp < div.player.retreatable.min(30) || (div.hp < 85 && Math.random() < this.hardness / 3) || (Math.random() > div.morale * 1.2 && div.morale < 1)) {
          if (defDiv.hp < div.player.retreatable.min(5) || (defDiv.morale < 0.25)) {
            defDiv.retreat();
          }
          results.reinforced = reinforcedDivs.length;
          results.reinforcedDef = defReinforcedDivs.length;
          that.battleInfo.push(results);
        });
        if (nextProv.divisions.length != 0) break;
        //break;
      }
    }
  }

  updateLocation(newLoc) {
    let prov = this.prov;
    let that = this;
    //prov.divisions = prov.divisions.filter(x => (x != that));
    let i = 0; prov.divisions.forEach((x, j) => { if (x == that) i = j; }); prov.divisions.splice(i, 1);
    this.loc = newLoc;
    this.prov.divisions.push(this);
    if (this.prov.owner != this.playerID)
      this.prov.fort = false
    this.prov.owner = this.playerID;
    this.entrench = 1;
  }

  remove() {
    let prov = this.prov;
    let that = this;
    prov.divisions = prov.divisions.filter(x => (x != that));
    this.player.casualties += this.men;
  }

  retreat() {
//     if (this.hp > this.player.retreatable) throw 'FATAL';
    if (this.hp <= 2 || this.men <= 400) { this.remove(); return; }
    let provs = [];
    let that = this;
    this.loc.adjacents(p => {
      if (p.prov.owner == that.player.playerID) provs.push(p)
    });
    if (provs.length == 0) { this.remove(); return; } // encircled
    let dist = provs.sort((x, y) => (x.prov.divisions.length - y.prov.divisions.length))[0];
    this.updateLocation(dist);
    this.action = [];
    this.movementProgress = 0;
  }

  get armored() {
    return this.template.armored;
  }

  get armor() {
    return this.supply > 0.1 ? this.template.armor : 0;
  }

  get hp() {
    return (this.men / this.template.troop * 100).clamp(0, 100)
  }

  get prov() {
    return this.loc.prov;
  }

  get player() {
    return PLAYERS[this.playerID];
  }

  get adjacentPenalty() {
    return Math.max(adjacentNotToPlayer(this.loc, this.player) - 1, 0);
  }

  get hardAttack() {
    return this.hard * this.loc.terrain.attrition * (0.3 + this.supply.max(1) * 0.7); // supply up to +-70%
  }

  get softAttack() {
    return this.soft * this.loc.terrain.attrition * (0.4 + this.supply.max(1) * 0.6); // supply up to +-60%
  }

  get hardDefense() {
    return this.hard * _weather.defenseCx * this.loc.terrain.defense;
  }

  get softDefense() {
    return this.soft * _weather.defenseCx * this.loc.terrain.defense;
  }

  get hard() {
    let prov = this.prov;
    let h = this.template.hard * ((this.skill - 1)/3*0.75+1) * this.hp / 100 * this.entrench *
      this.player.tempSumAllGeneralTraits.o;
    if (prov.fort)
      h *= 1.5;
    if (this.supply < 0.25)
      h *= 0.7; // -30%
    else if (this.supply < 0.5)
      h *= 0.5; // -50%
    return h - h * (this.adjacentPenalty / 4);
  }

  get speed() {
    return (this.template.speed * TERRAINS[this.prov.terrain].movement *
      this.player.tempSumAllGeneralTraits.s).round(2);
  }
  get reinforceRate() {
    return (Math.pow(this.template.speedBuff / 2 * TERRAINS[this.prov.terrain].movement.max(1) *
      this.player.tempSumAllGeneralTraits.s + this.template.entrenchBuff, 2) / 100
      / 3 * this.speed.max(6) *
      this.entrench.max(2).min(0.8) *
      ((this.morale - 1) / 10 + 1)).round(2).max(0.75).min(0.03);
  }

  get soft() {
    let prov = this.prov
    let s = this.template.soft * ((this.skill - 1)/3*0.75+1) * this.hp / 100 * this.entrench *
      this.player.tempSumAllGeneralTraits.o;
    if (prov.fort)
      s *= 1.5;
    if (this.supply < 0.25)
      s *= 0.9; // -10%
    else if (this.supply < 0.5)
      s *= 0.7; // -30%
    //return s * (this.morale).min(0.8).max(1.2) - s * (this.adjacentPenalty / 4)
    return s - s * (this.adjacentPenalty / 4)
  }

  get casualtyReductionFromSupport_Battle() {
    return this.template.casualtyReductionFromSupport_Battle;
  }
}

class ReinforcedDivisionWrapper {
  constructor(divs) {
    this.divs = divs;
    this.player = divs[0].player;

    this.resum();

    this.weightedAvgByMen('hardness');
    this.weightedAvgByMen('morale');
    this.weightedAvgByMen('armor');
    this.weightedAvgByMen('skill');
    this.weightedAvgByMen('casualtyReductionFromSupport_Battle');
  }

  resum() {
    const that = this;

    const sumFields = [
      'softAttack',
      'softDefense',
      'hardAttack',
      'hardDefense',
      '_men'
    ];

    for (let j = 0; j < sumFields.length; j++) {
      const key = sumFields[j];
      this[key] = 0;
      for (let i = 0; i < this.divs.length; i++) {
        const div = this.divs[i];
        this[key] = (this[key] || 0) + div[key.replace('_', '')];
      }
    }
    this.divRatios = this.divs.map(x => x.men / (that.men + 1));
  }

  get casualtyReductionFromSupport_Battle() {
    return this._casualtyReductionFromSupport_Battle;
  }
  get men() {
    return this._men;
  }
  get hardness() {
    return this._hardness;
  }
  get armor() {
    return this._armor;
  }
  set men(x) {
    this.weightedDeductionByMen('men', x, 0);
  }
  get morale() {
    return this._morale;
  }
  set morale(x) {
    this.weightedDeductionByMen('morale', x, 2);
  }
  get skill() {
    return this._skill;
  }
  set skill(x) {
    this.weightedDeductionByMen('skill', x, 2);
  }

  get hp() {
    this.weightedAvgByMen('hp');
    return this._hp;
  }

  weightedDeductionByMen(key, nx, round) {
    let delta = nx - this['_' + key];
    for (let i = 0; i < this.divs.length; i++) {
      let div = this.divs[i];
      let d2 = !isNaN(round) ? (delta * this.divRatios[i]).round(round) : delta * this.divRatios[i];
      div[key] += d2;
    }
    this['_' + key] += delta;
    this.resum();
  }

  remove() {
    this.divs.forEach(x => x.remove());
  }
  retreat() {
    this.divs.forEach(x => x.retreat());
  }

  get armored() {
    for (let i = 0; i < this.divs.length; i++)
      if (this.divs[i].armored)
        return true;
    return false;
  }

  weightedAvgByMen(key) {
    this['_' + key] = 0;
    for (let i = 0; i < this.divs.length; i++) {
      let div = this.divs[i];
      this['_' + key] += div[key] * this.divRatios[i];
    }
  }
}
