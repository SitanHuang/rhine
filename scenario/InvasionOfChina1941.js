var InvasionOfChinaOwners1941 = `
000000000000000000000000000000000111111111111111111111111|
000000000000000000000000000000000111111111111111111111111|
000000000000000000000000000011111111111111111111111111111|
000000000000000000000000001111111111111111111111111111111|
000000000000000000000000001111111111111111111111111111111|
000000000000000000000000111111111111111111111111111111111|
000000000000000000000001111111111111111111111111111111111|
000000000000000000000011111111111111111111111111111111111|
000000000000000000000001111111111111111111111111111111111|
000000000000000001000111111111111111111111111111111111111|
000000000000000001111111111111111111111111111111111111111|
000000000000000000111101111111111111111111111111111111111|
000000000000000000000000111111100111111111111111111111111|
000000000000000000000000111111001111111111111111111111111|
000000000000000000000000001111111111111111111111111111111|
000000000000000000000000001111111111111111110001111111111|
000000000000000000000000001111111111111111100111111111111|
000000000000000000000000001111111111111111111111111111111|
000000000000000000000000001111111001111111111111111111111|
000000000000000000000000001110011001111111111111111111111|
000000000000000000000000001110011011111110011111111111111|
000000000000000000000000000000011111001000000111111111111|
000000000000000000000000000000000000001000000111111111111|
000000000000000000000000000000000000001100110011111111111|
000000000000000000000000000000000000001111110011111111111|
000000000000000000000000000000000000000111111111111111111|
000000000000000000000000000000000110001111001111111111111|
000000000000000000000000000000001111011110000111111111111|
000000000000000000000000000000001111111100001111111111111|
000000000000000000000000000000000011111000001111111111111|
000000000000000000000000000000000111111000001111111111111|
000000000000000000000000000000000010111000000001111111111|
000000000000000000000000000000000000010000000000111111111|
000000000000000000000000000000000000000000000000111111111|
000000000000000000000000000000000000000000000001111111111|
000000000000000000000000000000000000000000000001111111111|
000000000000000000000000000000000000000000000011111111111|
000000000000000000000000000000000000000000000011111111111|
000000000000000000000000000000000000000000000011111111111|
000000000000000000000000000000000000000000000111111111111|
000000000000000000000000000000000000000000000111111111111|
000000000000000000000000000000000000000000001111111111111|
000000000000000000000000000000000000000000001111111111111|
000000000000000000000000000000000011000000011111111111111|
000000000000000000000000000000000111110000111111111111111|
000000000000000000000000000000000011111111111111111111111|
000000000000000000000111000000000001111111111111111111111|
000000000000000000011111110000000001111111111111111111111|
000000000000000000111111110000000111111111111111111111111|
000000000000000001111111111000011111111111111111111111111`
.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n');

var InvasionOfChinaTerrains1941 =
`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                 @|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@DU MMMDDD                MMM@|
@@@@@@@@@@@@@@@@@@@@@@@@@@DDD MMM D D            U MMMMM@|
@@@@@@@@@@@@@@@@@@@@@@@@@@DDDMMM DDDD U         MMMMMMM@@|
DDDDDDDUMDD@@@@@@@@@@@@@DDDD DD DDDDD          MMM  MMM@@|
DDDDDDDDMMMMMMDD@@@@@@@UDDDDDDDD U  D        MM     MM@@@|
DDDDDDDDDDDDDMMMDD@@@@MMMMMM DMMM   D       UMM    UM@@@@|
DDDDDDDDDD DDUMMM@@@@@@MM D  MMDDD         @@M       @@@@|
DDDDDDDDDDDD MMMMM@@@MU  DDUMMDDMM       U@@@  @ @    @@@|
DMMMDDDDDDD DD    MMMD****D MMDDMMM   U  @@@U @@@@     @@|
MMMMUMDDDDDDDD DDD  DDD D******MMU       @@@P@@@@P   U  @|
MMMMMMDDDDDDD DDDDDDDDMMMMDMM******    @@@@@@@@@@@ @    @|
DDMMMMMDD D DDDDDD  MMRRRRRMMMMU   **U@@@@@@@@@@@@@@@    |
DDDDMMMMD DD DDDDDMMMRRMMMRMMM      * P@@@@M@@@@@@@@     |
DDDDDMMMDDDDD DDUDMRRMMMDDRMMM    UM**  RMMM  P@@@@@@    |
RRDDDDDMM DDD DDDDRRMMDDDDRMMM     MM* RR**MU@@@@@@@@@  U|
DRRDDDDDMMDD  DDDDRMMMDDDDRMMMU    *******M@@@@@@@@@@@P @|
DDDRDDDDDM RRRDDD RMMMDUDDRMMM     * RR*MMM@@@@@@@@@@@@@@|
DDDRDU  DMMRRR DRRRMMMDDDRRDMDD   U*RR *U P@@@@@@@@@@@@@@|
DDDRD   DDMMMRRRRMMMMDDDUR DMDDD  *RR  *  @@@@@@@@@@@@@@@|
DDDRD    DDMMMMMMMMMMDDDDRRRRRDDDR**   *  U  @@@@@@@@@@@@|
DDDRDDU   DD       DDDDRRD DMRRRRRM* U ***   @@@@@@@@@@@@|
RRRRRDDMM  D        RRRD  MMDMMMMM *    U**   @@@@@@@@@@@|
RDDDDRDMMM   U    MMM  MMMDDDM   M**    RR*RR @@@@@@@@@@@|
DDDDDDRMMMM         M    DMMD     *MM  RR *U*RRR@@@@@@@@@|
DDDDDDDRMMM         MMM M   U  MM U MM R    **R@@@@@@@@@@|
DDDDDDMRMMM          MMMMMM     MM*MM RR  M  *UP@@@@@@@@@|
DDDDDDMRMMM  M MM MMMM    MMM     *M RR MMM  U @@@@@@@@@@|
DDDDDMMMRMMM MMMMMMMMM RRRR M     *MMR MM        @@@@@@@@|
DDDDDMMMRMRMM MMMMM URRR  RRRRRR  *URRUM     U   @@@@@@@@|
DDDDMMMMMMRRMMMM MMMRRMM MMMRMMRRR*RR RRMMMMMMM  @@@@@@@@|
DDDMMMMMMMMMRRM   M  MMMM   RM *U**    RRMMMMMMM @@@@@@@@|
MMMMMMMMMMMMMR  M  MMMUM    RM *MRR   URR MMM   @@@@@@@@@|
MMMMMMMMMMMM RR      MM   RRRM *MMR    R  M M  @@@@@@@@@@|
MMMM  UMMMM   R          RRU  **MMR MMM  MM M  @@@@@@@@@@|
       RRMM   R         RR  MU*MMRR U MMMMMMU @@@@@@@@@@@|
 RRRRRRRMMM   R         R   MMMMRR     MMMMM P@@@@@@@@@@@|
RR  RR  M    RR     U         M RMM    MMMM   @@@@@@@@@@@|
   RR RRM    R     MM         MRRMMM  MMMM M @@@@  @@@@@@|
   R R M    RR  MM MM      MMMRRMM   MMMMMMM @@@@P @@@@@@|
   R RRM   RR    MMMM  MM M MMRUM  MMMMMMUM @@@@ MM@@@@@@|
   R  R   R   U  MM MMMM MMM  R*** MM    M  @@@@ M  @@@@@|
  R  RM  RR       MMM     UMMMMMM*M      M @@@@@MP@@@@@@@|
    RRM  R       UMMM      MMMMMM*U**     @@@@@@@ @@@@@@@|
    R M           MM          MMM   * P@@@@@@@@@@@@@@@@@@|
   RRM            MM RRR            @P@@@@@@@@@@@@@@@@@@@|
   R MMMMMM      MMMM   RR         @@@@@@@@@@@@@@@@@@@@@@|
     MMMMMMMMMMMMM MMM U R       P@@@@@@@@@@@@@@@@@@@@@@@|
     MMUMMMMMM       MMM  R    @@@@@@@@@@@@@@@@@@@@@@@@@@`
	.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n').map((x, row) => (x.split('').map((v, col) => {
	  let o = InvasionOfChinaOwners1941[row][col] == '1' ? 1 : 0;
	  let slots = [];
	  if (v == 'U'){
	if (o == 1) slots = Array(3).fill('F');
    else if(Math.random()>0.3) slots = Array(1).fill('F');

	  }
    if (!TERRAINS[v]) throw 'Not found.'
    return {terrain: v, owner: o, slots: slots, divisions: [], supply: 4, pt: pt(row, col)}

  })));

function loadChina1941Scenario() {
  clearData();
  window.PORTS = [];
  PLAYERS.forEach(x => delete x._mapDataFlattened);

  MAP_DATA = InvasionOfChinaTerrains1941;
  pt(25, 43).prov.slots = Array(2).fill('F'); // Nanjing
  pt(30, 35).prov.slots = Array(5).fill('F'); // Wuhan
  pt(33, 22).prov.slots = Array(20).fill('F'); // Chongqing

  pt(0, 0).prov.callTrigger = 'ChineseCivilWarTrigger()';


  let p2 = PLAYERS[0];
  p2.color = 'rgba(120, 173, 206, 0.25)'
  p2.retreatable = 30;
  p2.manpower = Math.floor(Math.random() * 500000 + 9000000);
  p2.growthRate = 0.01;
  p2.light = 1500;
  p2.heavy = 500;
  p2.casualties = 2400000;
  p2.factoryInLight = 1;
  let p1 = PLAYERS[1];
  p1.color = 'rgba(120, 40, 40, 0.25)';
  p1.manpower = Math.floor(Math.random() * 500000 + 5000000);
  p1.growthRate = 0.0050;
  p1.light = -1500;
  p1.heavy = -2000;
  p1.casualties = 950000;
  p1.retreatable = 70;
  p1.factoryInLight = 1;
  p1.savedTemplates = [{"#":"Template","troop":28500,"light":32,"heavy":20,"defaultName":"步兵师团","support":10,"motorized":10},{"#":"Template","troop":8500,"light":14,"heavy":20,"defaultName":"炮兵联队","support":7,"motorized":0},{"#":"Template","troop":4500,"light":8,"heavy":10,"defaultName":"铁道联队","support":4,"motorized":5},{"#":"Template","troop":19000,"light":22,"heavy":14,"defaultName":"警备三单位制师团","support":8,"motorized":7},{"#":"Template","troop":8000,"light":4,"heavy":26,"defaultName":"装甲车队","support":2,"motorized":13},{"#":"Template","troop":18000,"light":6,"heavy":40,"defaultName":"装甲师团","support":3,"motorized":20},{"#":"Template","troop":4000,"light":6,"heavy":6,"defaultName":"侦察小队","support":3,"motorized":3}].map(x => {let t = new Template(x.troop, x.light, x.heavy, x.defaultName, x.support, x.motorized);t.defaultName = x.defaultName;return t});
  p2.savedTemplates = [{"#":"Template","troop":16000,"light":18,"heavy":10,"defaultName":"步兵师","support":9,"motorized":0},{"#":"Template","troop":12000,"light":12,"heavy":10,"defaultName":"骑兵师","support":6,"motorized":5},{"#":"Template","troop":22000,"light":40,"heavy":10,"defaultName":"野战步兵师","support":20,"motorized":5},{"#":"Template","troop":15000,"light":18,"heavy":18,"defaultName":"摩托化步兵师","support":9,"motorized":9},{"#":"Template","troop":23000,"light":6,"heavy":20,"defaultName":"装甲集团军","support":3,"motorized":10},{"#":"Template","troop":4000,"light":4,"heavy":4,"defaultName":"武警大队","support":2,"motorized":2},{"#":"Template","troop":10000,"light":12,"heavy":4,"defaultName":"民兵团","support":2,"motorized":0}].map(x => {let t = new Template(x.troop, x.light, x.heavy, x.defaultName, x.support, x.motorized);t.defaultName = x.defaultName;return t});

  let divisions = 0;

  MAP_DATA.forEach((x, row) => (x.forEach((v, col) => {
    if (v.terrain == '@') return;
    if (v.terrain == 'P')
      PORTS.push(pt(row, col));
    if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 || v.terrain == 'P')
      if (v.owner == 0) {
        if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 && v.terrain == 'U') v.fort = true;
        v.divisions = Array(v.terrain == 'P' || v.terrain == 'U' ? (Math.random() * 3).round() : Math.ceil(Math.random() * 3 + 3)).fill(0).map(() => (new Division(v.owner, `Divsion, ${((++divisions)/2).floor()}th Army Group`, pt(row, col), new Template(Math.random() > 0.7 ? 12000 : 7000, (Math.random() * 5 + 10).round(), (Math.random() * 5 + 3).round(), 'Division', 2+(Math.random()*3).round(), 1))))
        v.divisions.forEach(x => {x.skill = Math.random() * 2.5 + 0.5;x.entrench = 2;x.morale = Math.random() + 0.5;x.men = (Math.random() * 0.5 + 0.5) * x.template.troop;});
      } else {
        v.divisions = Array(v.terrain == 'U' ? 1 : Math.ceil(Math.random() * 2)+2).fill(0).map(() => (new Division(v.owner, 'Infantry Division', pt(row, col), new Template(14500, 17, 8, 'Division', 6, 3))))
        v.divisions.forEach(x => {x.skill = Math.random() * 1.5 + 1;x.entrench = 0.9 + Math.random();x.morale = 1.25;x.men = (Math.random() * 0.3 + 0.6) * x.template.troop;});
      }
  })));
  PORTS = PORTS.sort(() => (Math.random() - 0.5));
  pass();pass();

  // ============= misc ==============
  window.timestamp = -915148800; // 1/1/1944
  window.timeIncrement = 518400; // 6 days

  reinitCanvas();
  updateInterfaceOnPass();
}
