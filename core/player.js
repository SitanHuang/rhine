PLAYERS = [];

class Player {
  constructor() {
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

    this.light = 200;
    this.heavy = 100;
    this.constructionPoints = 0;
    this.divisions = 0;

    this.defaultTemplate = new Template(8000, 20, 5);
    this.savedTemplates = [this.defaultTemplate];

    this.retreatable = 10;

    PLAYERS.push(this);
    this.calcCities();

    this.factoryInLight = Math.ceil(this.factories / 2).clamp(0, this.factories);

    this.ai = new Ai(this);
    this.cityList = [];
    this.averageStrength = 100;
  }

  get mapDataFlattened() {
    return this._mapDataFlattened ? this._mapDataFlattened : this._mapDataFlattened = MAP_DATA.reduce((a, b) => a.concat(b), []);
  }

  get sumAllGeneralTraits() {
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

  produce() {
    this.light += Math.round(this.factoryInLight * Math.random() * 2);
    this.heavy += Math.round(this.factoryInHeavy * Math.random());
    this.constructionPoints += Math.round(this.factoryInLight * Math.random() * 2 + this.factoryInHeavy / 2);
  }

  growManpower() {
    this.manpower = (this.manpower * (this.growthRate + 1) + 5000).round().max(this.cities * 500000);
    this.growthRate = (0.00001 + this.growthRate).max(0.01)
  }

  get recruitable() {
    return Math.floor(this.manpower * (this.cities / this.originalCities / 1.5).min(1));
  }

  calcCities() {
    let that = this;
    this.factories = 0;
    this.divisions = 0;
    this.cityList = [];
    this.ports = [];
    this.averageStrength = 0;
    this.cities = this.mapDataFlattened
      .filter(col => {
        if (col.owner == that.playerID) {
          if (col.terrain == '@') return false;
          this.factories += factoriesInProv(col);
          this.divisions += col.divisions.length;
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
    return this.cities;
  }
}
