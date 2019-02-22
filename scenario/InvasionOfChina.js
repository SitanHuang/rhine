var InvasionOfChinaOwners =
`                                 111111111111111111111111|
                                 111111111111111111111111|
                               11111111111111111111111111|
                              111111111111111111111111111|
                             1111111111111111111111111111|
                            11111111111111111111111111111|
                            11111111111111111111111111111|
                           111111111111111111111111111111|
                         111111    1111111111111111111111|
                        111111      111111111111111111111|
                            11       11111111111111111111|
                                      1111111111111111111|
                                       111111111111111111|
                                      1111111111111111111|
                                       1111 1111111111111|
                                         11    1111111111|
                                             111111111111|
                                           11111111111111|
                                           11111111111111|
                                           11111111111111|
                                          111111111111111|
                                             111111111111|
                                             111111111111|
                                              11111111111|
                                              11111111111|
                                                111111111|
                                               1111111111|
                                              11111111111|
                                               1111111111|
                                                 11111111|
                                                 11111111|
                                                 11111111|
                                                 11111111|
                                                111111111|
                                               1111111111|
                                               1111111111|
                                              11111111111|
                                              11111111111|
                                              11111111111|
                                             111111111111|
                                             111111111111|
                                            1111111111111|
                                            1111111111111|
                                           11111111111111|
                                          111111111111111|
                                       111111111111111111|
                                    1 1111111111111111111|
                                   1111111111111111111111|
                                  11111111111111111111111|
                               11111111111111111111111111`
.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n');

var InvasionOfChinaTerrains =
`DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD   D                   @|
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD  DMM D                   @|
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDU MMMDDD                MMM@|
DDDDDDDDDDDDDDDDDDDDDDDDDDDDD MMM D D            U MMMMM@|
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDMMM DDDD U         MMMMMMM@@|
DDDDDDDUMDDDDDDDDDDDDDDUDDDD DD DDDDD          MMM  MMM@@|
DDDDDDDDMMMMMMDDDDDDDDDDDDDDDDDD    D        MM     MM@@@|
DDDDDDDDDDDDDMMMDDMMMMMMMMMM DMMM   D        MM    UM@@@@|
DDDDDDDDDD DD MMMMMMMMMMM D  MMDDD         @@M       @@@@|
DDDDDDDDDDDD MMMMMMMMM   DDDMMDDMM       U@@@  @ @    @@@|
DMMMDDDDDDD DD    MMMDDDDDD MMDDMMM      @@@U @@@@     @@|
MMMMUMDDDDDDDD DDD  DDD DDDDMMMMMU       @@@P@@@@P   U  @|
MMMMMMDDDDDDD DDDDDDDDMMMM DMMMMM      @@@@@@@@@@@ @    @|
DDMMMMMDD D DDDDDD  MMRRRRRMMMMU     U@@@@@@@@@@@@@@@    |
DDDDMMMMD DD DDDDDMMMRRMMMRMMM      M P@@@@M@@@@@@@@     |
DDDDDMMMDDDDD DDUDMRRMMMDDRMMM     MM   R@@M  P@@@@@@    |
RRDDDDDMM DDD DDDDRRMMDDDDRMMM     MM  RR  MU@@@@@@@@@  U|
DRRDDDDDMMDD  DDDDRMMMDDDDRMMMU       RR  M@@@@@@@@@@@P @|
DDDRDDDDDM RRRDDD RMMMDDDDRMMM       RR MMM@@@@@@@@@@@@@@|
DDDRDU  DMMRRR DRRRMMMDDDRRDMDD   U RR MU P@@@@@@@@@@@@@@|
DDDRD   DDMMMRRRRMMMMDDDDR DMDDD   RR     @@@@@@@@@@@@@@@|
DDDRD    DDMMMMMMMMMMDDDDRRRRRDDDRR       U  @@@@@@@@@@@@|
DDDRDDU   DD       DDDDRRD DMRRRRRM  U       @@@@@@@@@@@@|
RRRRRDDMM  D        RRRD  MMDMMMMM       RR   @@@@@@@@@@@|
RDDDDRDMMM   U    MMM  MMMDDDM   M      RRRRR @@@@@@@@@@@|
DDDDDDRMMMM         M    DMMD     MMM  RR  URRRR@@@@@@@@@|
DDDDDDDRMMM         MMM M   U  MM U MM R    RRR@@@@@@@@@@|
DDDDDDMRMMM          MMMMMM     MMMMM RR  M  RUP@@@@@@@@@|
DDDDDDMRMMM  M MM MMMM    MMM      M RR MMM    @@@@@@@@@@|
DDDDDMMMRMMM MMMMMMMMM RRRR M      MMR MM        @@@@@@@@|
DDDDDMMMRMRMM MMMMM URRR  RRRRRR  MURR M     U   @@@@@@@@|
DDDDMMMMMMRRMMMM MMMRRMM MMMRMMRRRRRR RRMMMMMMM  @@@@@@@@|
DDDMMMMMMMMMRRM   M  MMMM   RM MUR     RRMMMMMMM @@@@@@@@|
MMMMMMMMMMMMMR  M  MMMUM    RM  MRR   URR MMM   @@@@@@@@@|
MMMMMMMMMMMM RR      MM   RRRM  MMR    R  M M  @@@@@@@@@@|
MMMM   MMMM   R          RRU  MMMMR MMM  MM M  @@@@@@@@@@|
       RRMM   R         RR  MUMMMRR U MMMMMMU @@@@@@@@@@@|
 RRRRRRRMMM   R         R   MMMMRR     MMMMM P@@@@@@@@@@@|
RR  RR  M    RR               M RMM    MMMM   @@@@@@@@@@@|
   RR RRM    R     MM         MRRMMM  MMMM M @@@@ U@@@@@@|
   R R M    RR  MM MM      MMMRRMM   MMMMMMM @@@@P @@@@@@|
   R RRM   RR    MMMM  MM M MMRMM  MMMMMMUM @@@@ MM@@@@@@|
   R  R   R   U  MM MMMM MMM  R    MM    M  @@@@ M  @@@@@|
  R  RM  RR       MMM      MMMMMM M      M @@@@@MP@@@@@@@|
    RRM  R        MMM      MMMMMM U       @@@@@@@ @@@@@@@|
    R M           MM          MMM     P@@@@@@@@@@@@@@@@@@|
   RRM            MM RRR            @ @@@@@@@@@@@@@@@@@@@|
   R MMMMMM      MMMM   RR         @@@@@@@@@@@@@@@@@@@@@@|
     MMMMMMMMMMMMM MMM U R       P@@@@@@@@@@@@@@@@@@@@@@@|
     MMMMMMMMM       MMM  R    @@@@@@@@@@@@@@@@@@@@@@@@@@`
	.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n').map((x, row) => (x.split('').map((v, col) => {
	  let o = InvasionOfChinaOwners[row][col] == '1' ? 1 : 0;
	  let slots = [];
	  if (v == 'U'){
	if (o == 1) slots = Array(10).fill('F');
    else if(Math.random()>0.3) slots = Array(1).fill('F');

	  }
    if (!TERRAINS[v]) throw 'Not found.'
    return {terrain: v, owner: o, slots: slots, divisions: [], pt: pt(row, col)}

  })));

MAP_DATA = InvasionOfChinaTerrains;
pt(25, 43).prov.slots = Array(10).fill('F'); // Nanjing
pt(30, 35).prov.slots = Array(25).fill('F'); // Wuhan
pt(33, 22).prov.slots = Array(5).fill('F'); // Chongqing


let p2 = new Player();
p2.color = 'rgba(140, 193, 226, 0.25)'
p2.retreatable = 30;
p2.manpower = Math.floor(Math.random() * 50000 + 6000000);
p2.growthRate = 0.0075;
p2.light = 0;
p2.heavy = -100;
p2.factoryInLight = 40;
let p1 = new Player();
p1.color = randomColor({alpha: 0.2, format: 'rgba', hue: 'red'})
p1.manpower = Math.floor(Math.random() * 500000 + 2500000);
p1.light = 600;
p1.heavy = 900;
p1.retreatable = 30;
p1.factoryInLight = 1;
p1.savedTemplates = [{"troop":8000,"light":20,"heavy":5,"defaultName":"Infantry Division"},{"troop":23000,"light":5,"heavy":12,"defaultName":"T12 Heavy Tank Division"},{"troop":20000,"light":25,"heavy":10,"defaultName":"T49 Armored Infantry Division"},{"troop":10000,"light":5,"heavy":6,"defaultName":"Light Motorized Mountaineer Division"},{"troop":17000,"light":38,"heavy":6,"defaultName":"T67 Armored Infantry Mountaineer Division"},{"troop":39000,"light":25,"heavy":10,"defaultName":"T918 Heavy Armored Infantry Division"},{"troop":23000,"light":10,"heavy":12,"defaultName":"T24 Heavy Tank Division"},{"troop":23000,"light":20,"heavy":3,"defaultName":"T42 Heavy Calvary Mountaineer Division"}].map(x => {let t = new Template(x.troop, x.light, x.heavy);t.defaultName = x.defaultName;return t});
p2.savedTemplates = [{"troop":8000,"light":20,"heavy":10,"defaultName":"Infantry Division"},{"troop":23000,"light":5,"heavy":12,"defaultName":"T12 Heavy Tank Division"},{"troop":20000,"light":25,"heavy":10,"defaultName":"T49 Armored Infantry Division"},{"troop":10000,"light":5,"heavy":6,"defaultName":"Light Motorized Mountaineer Division"},{"troop":17000,"light":38,"heavy":6,"defaultName":"T67 Armored Infantry Mountaineer Division"},{"troop":39000,"light":25,"heavy":10,"defaultName":"T918 Heavy Armored Infantry Division"},{"troop":23000,"light":10,"heavy":12,"defaultName":"T24 Heavy Tank Division"},{"troop":23000,"light":20,"heavy":3,"defaultName":"T42 Heavy Calvary Mountaineer Division"}].map(x => {let t = new Template(x.troop, x.light, x.heavy);t.defaultName = x.defaultName;return t});

let divisions = 0;

MAP_DATA.forEach((x, row) => (x.forEach((v, col) => {
  if (v.terrain == '@') return;
  if (v.terrain == 'P')
    PORTS.push(pt(row, col));
  if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 || v.terrain == 'P')
    if (v.owner == 0)
      v.divisions = Array(v.terrain == 'P' || v.terrain == 'D' || row < 10 ? 1 : Math.ceil(Math.random() * 9 + 8)).fill(0).map(() => (new Division(v.owner, `Regiment, ${((++divisions)/2).floor()}th Division`, pt(row, col), new Template(Math.random() > 0.7 ? 10000 : 4000, 7, 1))))
    else
      v.divisions = Array(v.terrain == 'U' ? 3 : Math.ceil(Math.random() * 5)).fill(0).map(() => (new Division(v.owner, 'Infantry Regiment', pt(row, col), new Template(11000, 11, 10))))
})));
PORTS = PORTS.sort(() => (Math.random() - 0.5));
// Shanghai
pt(27, 46).prov.divisions = Array(13).fill(0).map(() => (new Division(1, 'Infantry Regiment', pt(27, 46), new Template(15000, 15, 10))))
  .concat(Array(8).fill(0).map(() => (new Division(1, 'Tank Division', pt(27, 46), new Template(23000, 9, 25)))));
// Nanjing
pt(25, 43).prov.divisions = Array(2).fill(0).map(() => {
  let d = new Division(0, 'German Infantry Division', pt(25, 43), new Template(19000, 20, 35))
  d.skill = 0.9;
  return d;
})
pt(25, 43).prov.divisions = Array(8).fill(0).map(() => {
  let d = new Division(0, 'Infantry Division', pt(25, 43), new Template(10000, 10, 3))
  d.skill = 2;
  return d;
})
