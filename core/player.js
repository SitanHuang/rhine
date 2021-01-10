PLAYERS = [];
HEAVY_EQUIPMENT_COEF = 0.7; // one factory produces 0.7 heavy equipments per turn

class Player {
  constructor() {
    this['#'] = 'Player';
    this.color = randomColor({
      luminosity: 'dark',
      format: 'rgba',
      alpha: 0.15
    });
    this.playerID = PLAYERS.length;
    this.manpower = Math.floor(Math.random() * 5000000 + 5000000);
    this.casualties = 0;
    this.growthRate = Math.random() * 0.007;

    this.originalCities = this.calcCities();
    this.factories = 0;

    this.queue = [];
    this.queueDist = null;
    this.percentReserved = 20;
    this._light = 0;
    this._heavy = 0;
    this.light = 0;
    this.heavy = 0;
    this.constructionPoints = 0;
    this.divisions = 0;

    this.defaultTemplate = new Template(9000, 20, 5, 'Infantry Division', 8, 0);
    this.savedTemplates = [this.defaultTemplate];

    this.retreatable = 10;

    PLAYERS.push(this);
    this.calcCities();

    this.factoryInLight = Math.ceil(this.factories / 2).clamp(0, this.factories);

    this.ai = new Ai(this);
    this.cityList = [];
    this.averageStrength = 100;

    this.diplomacy = {};
  }

  get light() {
    return this._light;
  }
  set light(x) {
    this.__set_equipment(x, '_light');
  }
  get heavy() {
    return this._heavy;
  }
  set heavy(x) {
    this.__set_equipment(x, '_heavy');
  }

  __set_equipment(x, n) {
    let d = x - this[n];
    if (d <= 0 || this[n] < 0) {
      this[n] = x;
    } else {
      let res = (this.percentReserved / 100 * d).floor();
      let q = this.__queue_equipment_request(n).clamp(0, d - res);
      res += d - q - res; // spare after fulfilling Q goes to reserve
      this[n] += res;
      fill_queue(n, q);
    }
  }

  __queue_equipment_request(n) {
    let i = queue_info();
    return n == '_light' ? (i.nl - i.l) : (i.nh - i.h);
  }

  get mapDataFlattened() {
    return this._mapDataFlattened ? this._mapDataFlattened : this._mapDataFlattened = MAP_DATA.reduce((a, b) => a.concat(b), []);
  }

  get _populationData() {
    return this.__populationData || {
      net: 0,
      growth: [0, 0, 0],
      last: this.manpower
    };
  }

  get sumAllGeneralTraits() {
    if (!this.generals)
      this.generals = ChineseGenerals;
    let template = {
      o: 1,
      s: 1,
      e: 1,
      b: 1
    };
    Object.values(this.generals).forEach(rank => {
      Object.values(rank).forEach(general => {
        if (!general.selected) return;
        for (let key in template) {
          template[key] = (general.mod[key] * template[key]).round(3).min(0.1).max(2);
        }
      })
    });
    this.tempSumAllGeneralTraits = template;
    return template;
  }

  get factoryInHeavy() {
    let h = this.factories - this.factoryInLight;
    if (h < 0) {
      this.factoryInLight = this.factories;
      return 0;
    }
    return h;
  }

  get _heavyProductionPerTurn() {
    return Math.round(this.factoryInHeavy * HEAVY_EQUIPMENT_COEF);
  }
  get _lightProductionPerTurn() {
    return Math.round(this.factoryInLight);
  }

  produce() {
    this.light += this._lightProductionPerTurn;
    this.heavy += this._heavyProductionPerTurn;
    this.constructionPoints += Math.round(this.factoryInLight + this.factoryInHeavy * HEAVY_EQUIPMENT_COEF);
  }

  activateReserve(amount) {
    amount = amount || 1;
    let l = (this.light * amount).floor();
    let h = (this.heavy * amount).floor();
    let oldPerc = this.percentReserved;
    this.percentReserved = 0;
    this._light -= l;
    this._heavy -= h;
    this.light += l;
    this.heavy += h;
    this.percentReserved = oldPerc;
  }

  growManpower() {
    let growthFromRate = this.manpower * this.growthRate / 3;
    let fixedGrowth = this.cities * 100000 * (this.growthRate) * 2;
    this.manpower = (this.manpower + fixedGrowth).round().max(this.cities * 500000);
    //this.manpower = (this.manpower + growthFromRate + fixedGrowth).round().max(this.cities * 500000);
    this.growthRate = (0.00001 * Math.random() + this.growthRate).max(0.01);

    this.__populationData = {
      net: this.manpower - this._populationData.last,
      death: (this.manpower - this._populationData.last - (growthFromRate.round() + fixedGrowth.round())).round(),
      growth: [(growthFromRate.round() + fixedGrowth.round()), growthFromRate.round(), fixedGrowth.round()],
      actualLast: this._populationData.last,
      last: this.manpower
    }
  }

  get recruitable() {
    return Math.floor(this.manpower * (this.cities / this.originalCities / 1.5).min(1));
  }

  calcCities() {
    let that = this;
    this.factories = 0;
    this.divisions = 0;
    this.divisionMen = 0;
    this.divisionDamage = 0;
    this.cityList = [];
    this.ports = [];
    this.averageStrength = 0;
    this.cities = this.mapDataFlattened
      .filter(col => {
        if (col.owner == that.playerID) {
          if (col.terrain == '@') return false;
          this.factories += factoriesInProv(col);
          this.divisions += col.divisions.length;
          col.divisions.forEach(div => { this.divisionMen += div.men; this.divisionDamage += div.soft + div.hard; });
          col.adjacentNotToPlayer = col.pt.adjacentNotToPlayer(that)
          col.divisions.forEach(div => {
            that.averageStrength += div.hp;
            div.adjacentNotToPlayer = col.adjacentNotToPlayer;
          });
          if (col.terrain == 'U') {
            that.cityList.push(col.pt)
            return true;
          }
          if (col.terrain == 'P') {
            that.ports.push(col.pt)
            return true;
          }
        }
        return false;
      }).length;
    this.averageStrength = (this.averageStrength / this.divisions).round(2);

    this.largestCity = this.cityList.sort((a, b) => b.prov.slots.length - a.prov.slots.length)[0];
    if (this.queueDist && this.queueDist.prov.owner != this.playerID) this.queueDist = null;
    return this.cities;
  }
}
