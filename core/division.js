class Division {
  constructor(playerID, name, point, template) {
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

    this.morale = 1;
  }

  reinforce() {
    if (this.hp < 100 && this.supply > 0) {
      let amount = this.template.troop - this.men;
      amount = Math.min(Math.sqrt(amount * 50), this.player.recruitable / 500).round();
      this.newInforced += amount;
      this.player.manpower -= amount;
      this.men = (this.men + amount).round().clamp(0, this.template.troop);
    }
  }

  get breakThrough() {
    return (this.template.breakThrough * this.player.tempSumAllGeneralTraits.b).round(2).clamp(0, 0.8);
  }

  move() {
    if (this.skill < 1)
      this.skill += 0.1;
    if (this.morale < 1)
      this.morale += 0.05;

    this.entrench = (this.entrench + 0.1 * this.player.tempSumAllGeneralTraits.e).round(2).clamp(1, 2);
    this.newInforced = 0;
    this.battleInfo = [];
    this.reinforce();

    let player = this.player;
    let that = this;
    this.supply = this.loc.prov.supply;

    if (this.supply == 0) {
      let a = this.men / 10;
      this.men = (this.men - a).round().min(0);
      player.casualties += a.round();
    }

    if (this.action.length == 0 || (this.hp < 80 && Math.random() < this.morale / 3 && this.morale < 1)) {
      this.movementProgress = 0;
      return;
    }
    this.movementProgress += this.speed;
    while (this.movementProgress >= 1 && this.action.length > 0) {
      this.movementProgress--;
      let nextPt = this.action[0];
      let nextProv = nextPt.prov;
      let divs = nextProv.divisions;

      if (nextPt.owner == this.player || divs.length == 0) {
        this.updateLocation(nextPt);
        this.action.shift();
      } else {
        let that = this;
        divs.forEach(div => {
          if (this.hp < this.player.retreatable.min(30)) return;
          div.movementProgress = -2;
          let results = battle(that, div);
          if (div.hp < div.player.retreatable.min(30) || (div.hp < 50 && Math.random() < this.breakThrough / 3) || (div.hp < 80 && Math.random() < div.morale / 3 && div.morale < 1)) {
            div.retreat();
          }
          that.battleInfo.push(results);
        })
        break;
      }
    }
  }

  updateLocation(newLoc) {
    let prov = this.prov;
    let that = this;
    prov.divisions = prov.divisions.filter(x => (x != that));
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
  }

  retreat() {
//     if (this.hp > this.player.retreatable) throw 'FATAL';
    if (this.hp <= 2 || this.men <= 400) this.remove();
    let provs = [];
    let that = this;
    this.loc.adjacents(p => {
      if (p.owner == that.player) provs.push(p)
    })
    if (provs.length == 0) return;
    let dist = provs.sort((x, y) => (x.prov.divisions.length - y.prov.divisions.length))[0];
    this.updateLocation(dist);
    this.action = [];
    this.movementProgress = 0;
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

  get hard() {
    let prov = this.prov;
    let h = this.template.hard * TERRAINS[prov.terrain].attrition * this.skill * this.hp / 100 * this.entrench *
      this.player.tempSumAllGeneralTraits.o;
    if (prov.fort)
      h *= 1.5;
    return h - h * (this.adjacentPenalty / 4);
  }

  get speed() {
    return (this.template.speed * TERRAINS[this.prov.terrain].movement *
      this.player.tempSumAllGeneralTraits.s).round(2);
  }

  get soft() {
    let prov = this.prov
    let terrain = TERRAINS[prov.terrain];
    let s = this.template.soft * terrain.attrition * terrain.defense * this.skill * this.hp / 100 * this.entrench *
      this.player.tempSumAllGeneralTraits.o;
    if (prov.fort)
      s *= 1.5;
    return s * (this.morale).min(0.8).max(1.5) - s * (this.adjacentPenalty / 4)
  }
}
