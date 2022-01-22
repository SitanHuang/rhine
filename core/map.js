window.MAP_DATA = `
                MM            |
      U                       |
                              |
                   M   U      |
                    M         |
            M                 |
                              |
  U        RRRRRRR            |
          RR     RRRRRR       |
         RR U         RRR     |
      M  R              RRRR  |
     M   R      MMM   U    RRR|
    M   RR     MM M           |
  MM    R     MM  M   MMMMM   |
 MM    RR                     |
       R   MM            MMMMM|
       R             MMMM     |
      RR           MMM        |
  U   R           MM          |
     RR   M      MM           |
    RR    M                   |
    R      M   M           U  |
   RR       M                 |
  RR    M                     |
 RR     M            M        |
RR U    MM                    |
`.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n').map(x => x.split('').map(v => ({terrain: v, owner: null, slots: []})));

if (window.MAP_JSON) {
  MAP_DATA = JSON.parse(MAP_JSON);
}

window.PORTS = [];

window.TERRAINS = {
  ' ': {
    name: 'Plain',
    render: ' ',
    // from analysis of WWII troop densities
    width: 60000, // in men, for attacking
    defense: 1,
    attrition: 1,
    movement: 0.75, // 1.11111111
    slots: 5
  },
  M: {
    name: 'Mountain',
    render: '⛰️',
    width: 10000,
    color: 'green',
    defense: 1.5,
    attrition: 0.7,
    movement: 0.2, // 5
    slots: 1
  },
  F: {
    name: 'Forest',
    render: '🌲',
    width: 30000,
    color: 'green',
    defense: 1.2,
    attrition: 0.8,
    movement: 0.5, // 2
    slots: 0
  },
  D: {
    name: 'Desert',
    render: '░░',
    width: 60000,
    color: '#a0a001',
    defense: 0.9,
    attrition: 0.6,
    movement: 0.1, // 10
    slots: 0
  },
  R: {
    name: 'River',
    render: '🌫️',
    width: 80000,
    color: 'blue',
    defense: 1.5,
    attrition: 1.2,
    movement: 2, // 1
    slots: 0
  },
  '*': {
    name: 'Rail',
    render: '#',
    width: 100000,
    color: 'black',
    defense: 1,
    attrition: 1.3,
    movement: 3, // 1
    slots: 0
  },
  P: {
    name: 'Port',
    render: '⚓',
    width: 250000,
    defense: 1.5,
    attrition: 1.5,
    movement: 1.2, // 1
    slots: 30
  },
  U: {
    name: 'Urban',
    render: '🏙️',
    width: 500000,
    color: '#db4437',
    defense: 2,
    attrition: 1.5,
    movement: 1,
    slots: 60
  },
  '@': {
    name: 'Non-accessible',
    render: '',
    color: 'transparent',
    defense: 0,
    attrition: 0,
    movement: -10,
    slots: 0
  }
}
