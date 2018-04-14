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

window.TERRAINS = {
  ' ': {
    name: 'Plain',
    render: ' ',
    defense: 1,
    attrition: 0.9,
    movement: 0.9, // 1.11111111
    slots: 5
  },
  M: {
    name: 'Mountain',
    render: '⛰️',
    color: 'green',
    defense: 3,
    attrition: 0.6,
    movement: 0.2, // 5
    slots: 2
  },
  D: {
    name: 'Desert',
    render: '░░',
    color: '#a0a001',
    defense: 1.2,
    attrition: 0.4,
    movement: 0.1, // 10
    slots: 1
  },
  R: {
    name: 'River',
    render: '🌫️',
    color: 'blue',
    defense: 2,
    attrition: 0.4,
    movement: 1, // 1
    slots: 0
  },
  P: {
    name: 'Port',
    render: 'P',
    defense: 1.5,
    attrition: 1.3,
    movement: 1, // 1
    slots: 30
  },
  U: {
    name: 'Urban',
    render: '🏙️',
    color: '#db4437',
    defense: 5,
    attrition: 1.3,
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
