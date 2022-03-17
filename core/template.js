MAX_SPEED = 8;
SPEED_UNIT = 'km/h';
ARMORED_MIN = 0.6;

class Template {
  constructor(troop, light, heavy, name, support, motorized) {
    this['#'] = 'Template';
    this.troop = troop;
    this.light = light;
    this.heavy = heavy;
    this.defaultName = name || 'Infantry Division';

    this.support = (support || (this.light / 10)).max(this.light / 2).floor();
    this.motorized = (motorized || (this.heavy / (this.heavy + this.light) * 10)).max(this.heavy).floor();
  }

  get hardness() {
    // return ((this.motorized + this.heavy) / (this.motorized + this.heavy + this.light) / 1.5).round(2).min(0).max(0.9);
    return (1.3 * Math.pow((this.heavy + this.motorized) / 2 / (this.heavy + this.light).min(1), 1.7)).min(0).max(0.99);

  }
  get armored() {
    return this.armor > ARMORED_MIN && this.heavy >= 10 && this.motorized >= 5;
  }
  get armor() {
    return (this.heavy / (this.heavy + this.light).min(1)).min(0).max(0.99);
  }
  get manpower() {
    return this.troop;
  }

  get soft() {
    let h = (this.troop / 100 + this.motorized * 100) / 20 + 500 * this.heavy;
    return ((this.troop / 100 *
      (this.light) + this.support * 100) + h / 2) * 1.2;
  }
  get hard() {
    return ((this.troop / 100 + this.motorized * 100) / 20 + 500 * this.heavy) * 0.2;
  }


  get supplyBuff() {
    return this.speedBuff.min(1) * this.entrenchBuff;
  }

  get entrenchBuff() {
    return this.support / (this.troop / 1000) + 0.9;
  }

  get speedBuff() {
    return this.motorized / (this.troop / 2000) + 0.9;
  }

  deployable(player, skipStockCheck) {
    if (this.speed <= 0.5) return false;
    if (!this.speed || !this.light || !this.heavy || !this.troop) return false;
    if (player.recruitable <= this.troop) return false;
    if (!skipStockCheck && (player.light < (this.light + this.support) || player.heavy < (this.motorized + this.heavy))) return false;
    return true;
  }

  get codeName() {
    let title = '';
    let div = this.troop > 20000 ? 'Corps' : (this.troop > 9000 ? 'Division' : (this.troop > 4000 ? 'Regiment' : 'Brigade'));
    if (this.speed < 2)
      title = 'Garrison ' + div;
    else if (this.speed < 3)
      title = 'Heavy () ' + div;
    else if (this.speed < 4)
      title = '() ' + div;
    else if (this.speed < 4.5)
      title = 'Heavy Calvary ' + div;
    else if (this.speed < 5.5)
      title = 'Calvary ' + div;
    else
      title = 'Light Calvary ' + div;
    if (this.heavy > this.light)
      title = title.replace('()', 'Artillery');
    else
      title = title.replace('()', 'Infantry');
    if (this.mockSpeed(TERRAINS.M) > 1.5)
      title = title.replace(' ' + div, ' Mountaineer ' + div);
    if (this.armored && this.hardness > 0.7)
      title = title.replace('Calvary', 'Tank');
    else if (this.armored)
      title = title.replace('Infantry', 'Armored Infantry').replace('Garrison', 'Armored Garrison').replace('Calvary', 'Combined Arms');
    else if (this.hardness > 0.35)
      title = title.replace('Calvary', 'Motorized');
    return `${title} ${(this.troop / 1000).round()}${(this.light / 10).round()}${(this.heavy / 10).round()}`;
  }

  deploy(player, loc, title, queue) {
    let div = new Division(player.playerID, title, loc, this.deepClone())
    let men = Math.ceil(this.troop / 15);
    if (!queue) {
      player.light -= this.light + this.support;
      player.heavy -= this.heavy + this.motorized;
      player.manpower -= men;
      div.skill = 0.2;
      div.men = men;
    } else {
      player.manpower -= men;
      div.men = men + queue.t;
      div.skill = div.hp / 100;
    }
  }

  deepClone() {
    let t = new Template(this.troop, this.light, this.heavy);
    t.defaultName = this.defaultName.deepClone();
    t.support = this.support;
    t.motorized = this.motorized;
    t.irremovable = this.irremovable;
    return t;
  }

  get productionCost() {
    return Math.ceil(
      1 / HEAVY_EQUIPMENT_COEF * (this.heavy + this.motorized) +
      this.light + this.support +
      // also account for lost construction points
      (1 - HEAVY_EQUIPMENT_COEF).min(0) * (this.heavy + this.motorized)
    );
  }

  get productionEfficiency() {
    return ((this.hard + this.soft) / this.productionCost).round();
  }

  get manpowerEfficiency() {
    return ((this.hard + this.soft) / this.troop).round(2);
  }

  get manpowerEfficiencyPierced() {
    return ((this.hard + this.soft) * 2 / this.troop).round(2);
  }

  get productionEfficiencyPierced() {
    return ((this.hard + this.soft) / this.productionCost * 2).round();
  }
  get manpowerEfficiencyPiercedAttacking() {
    return ((this.hard + this.soft) * 4 / this.troop).round(2);
  }

  get productionEfficiencyPiercedAttacking() {
    return ((this.hard + this.soft) / this.productionCost * 4).round();
  }

  mockHardAttack(terrain) {
    return this.hard * terrain.attrition;
  }

  mockSoftAttack(terrain) {
    return this.soft * terrain.attrition;
  }

  mockHardDefense(terrain) {
    return this.hard * terrain.defense;
  }

  mockSoftDefense(terrain) {
    return this.soft * terrain.defense;
  }

  mockSpeed(terrain) {
    return (this.speed * terrain.movement).round(2);
  }

  get speed() {
    return (MAX_SPEED - this.light / this.troop * 1000 - this.heavy / this.troop * 800 -
      this.troop / 5000 / this.speedBuff).clamp(0, MAX_SPEED).round(2);
  }

  get inspect() {
    return `Soft: ${this.soft}, Hard: ${this.hard}`;
  }
}
