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
  }

  reinforce() {
    if (this.hp < 100 && this.supply > 0) {
      let amount = this.template.troop - this.men;
      amount = Math.min(Math.sqrt(amount * 100), this.player.recruitable / 100).round();
      this.newInforced += amount;
      this.player.manpower -= amount;
      this.men = (this.men + amount).round().clamp(0, this.template.troop);
    }
  }

  move() {
    this.entrench = (this.entrench + 0.1).round(1).clamp(1, 2);
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

    if (this.action.length == 0) {
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
          if (this.hp < this.player.retreatable) return;
          div.movementProgress = -2;
          let results = battle(that, div);
          if (div.hp < div.player.retreatable) {
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
    this.prov.owner = this.playerID;
    this.entrench = 1;
  }

  remove() {
    let prov = this.prov;
    let that = this;
    prov.divisions = prov.divisions.filter(x => (x != that));
  }

  retreat() {
    if (this.hp > this.player.retreatable) throw 'FATAL';
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
    let h = this.template.hard * TERRAINS[this.prov.terrain].attrition * this.skill * this.hp / 100 * this.entrench;
    return h - h * (this.adjacentPenalty / 4);
  }

  get speed() {
    return (this.template.speed * TERRAINS[this.prov.terrain].movement).round(2);
  }

  get soft() {
    let terrain = TERRAINS[this.prov.terrain];
    let s = this.template.soft * terrain.attrition * terrain.defense * this.skill * this.hp / 100 * this.entrench;
    return s - s * (this.adjacentPenalty / 4)
  }
}
