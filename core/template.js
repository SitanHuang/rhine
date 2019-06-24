MAX_SPEED = 8
SPEED_UNIT = 'km/h'

class Template {
  constructor(troop, light, heavy, name) {
    this['#'] = 'Template';
    this.troop = troop;
    this.light = light;
    this.heavy = heavy;
    this.defaultName = name || 'Infantry Division';
  }

  get breakThrough() {
    return (this.heavy / (this.heavy + this.light) / 1.5).round(2).min(0).max(0.9);
  }
  get manpower() {
    return this.troop;
  }

  get soft() {
    return this.troop / 100 *
      (this.light);
  }

  deployable(player) {
    if (this.speed <= 0.5) return false;
    if (!this.speed || !this.light || !this.heavy || !this.troop) return false;
    if (player.light < this.light || player.heavy < this.heavy ||
      player.recruitable <= this.troop) return false;
    return true;
  }

  get codeName() {
    let title = '';
    if (this.speed < 2)
      title = 'Garrison Division';
    else if (this.speed < 3)
      title = 'Heavy () Division';
    else if (this.speed < 4)
      title = '() Division';
    else if (this.speed < 4.5)
      title = 'Heavy Calvary Division';
    else if (this.speed < 5.5)
      title = 'Calvary Division';
    else
      title = 'Light Calvary Division';
    if (this.heavy > this.light)
      title = title.replace('()', 'Artillery');
    else
      title = title.replace('()', 'Infantry');
    if (this.mockSoft(TERRAINS.M) + this.mockHard(TERRAINS.M) > this.hard + this.soft)
      title = title.replace(' Division', ' Mountaineer Division');
    if (this.hard > 2000)
      title = title.replace('Infantry', 'Armored Infantry').replace('Garrison', 'Armored Garrison');
    if (this.heavy > 10)
      title = title.replace('Calvary', 'Tank');
    else if (this.heavy > 5)
      title = title.replace('Calvary', 'Motorized');
    return `Type ${(this.troop / 1000).round()}${(this.light / 10).round()}${(this.heavy / 10).round()} ${title}`;
  }

  deploy(player, loc, title) {
    let men = Math.ceil(this.troop / 15);
    player.light -= this.light;
    player.heavy -= this.heavy;
    player.manpower -= men;
    let div = new Division(player.playerID, title, loc, this.deepClone())
    div.skill = 0.2;
    div.men = men;
  }

  deepClone() {
    let t = new Template(this.troop, this.light, this.heavy);
    t.defaultName = this.defaultName.deepClone();
    return t;
  }

  get hard() {
    return this.soft / 5 * (this.heavy);
  }

  mockHard(terrain) {
    return this.hard * terrain.attrition;
  }

  mockSoft(terrain) {
    return this.soft * terrain.attrition * terrain.defense;
  }

  mockSpeed(terrain) {
    return (this.speed * terrain.movement).round(2);
  }

  get speed() {
    return (MAX_SPEED - this.light / this.troop * 1000 - this.heavy / this.troop * 800 -
      this.troop / 8000).clamp(0, MAX_SPEED).round(2);
  }

  get inspect() {
    return `Soft: ${this.soft}, Hard: ${this.hard}`;
  }
}
