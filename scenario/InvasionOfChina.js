window.timestamp = -1025049600; // 7/9/1937
var ChineseCivilWarTrigger = function () {
  if (pt(0, 0).prov.callTrigger != 'ChineseCivilWarTrigger()') return false;
  if (timestamp > -976573832 && !pt(0, 0).prov.foreignSupplied) {
    PLAYERS[0].light += 700;
    PLAYERS[0].heavy += 950;
    PLAYERS[0].constructionPoints += 550 * 10;
    pt(0, 0).prov.foreignSupplied = true;
  }
  if (timestamp > -885769139 && !pt(0, 0).prov.pearlHarbor) {
    PLAYERS[1].growthRate = 0.001;
    PLAYERS[1].light = -2500;
    PLAYERS[1].heavy = -3000;
    PLAYERS[0].light += 1900;
    PLAYERS[0].heavy += 700;
    PLAYERS[0].constructionPoints += 550 * 10;
    PLAYERS[1].constructionPoints -= 550 * 20;
    PLAYERS[1].manpower = (PLAYERS[1].manpower -= 1000000).min(0).round();
    pt(0, 0).prov.pearlHarbor = true;
  }
  if (PLAYERS[1].cities <= 4 ||
    (PLAYERS[0].cities >= 10 && Math.random() > 0.8 && timestamp > -769392000)) { // 8/15/1945
    PLAYERS[1].growthRate = PLAYERS[1].manpower = 0;
    PLAYERS[1].color='rgba(250, 220, 137, 0.25)';

    MAP_DATA.forEach((x, r) => {
      x.forEach((col, c) => {
        if (!col) return;
        col.supply = 4;
        col.fort = false;
        if (r >= 8 && c >= 49 && r <= 17) { // Korea
          col.terrain = '@';col.slots = [];
        } else if ((r >= 39 && c >= 48) || col.terrain == 'P') { // Taiwan
          col.owner = 0;
          col.divisions.forEach(d => d.playerID = 0);
        } else if (col.owner == 1 && Math.random() > 0.05) {
          col.divisions = [];
          if (Math.random() > 0.7)
            col.owner = 0;
        }
      })
    });


    window.p3 = PLAYERS[2] || new Player();
    p3.color = 'rgba(150, 0, 0, 0.2)';
    p3.manpower = 10000000;
    p3.growthRate = 0.01;
    p3.light = PLAYERS[1].light + 5000;
    p3.factories = 0;
    p3.heavy = PLAYERS[1].heavy + 5000;
    p3.constructionPoints = 2000 + (Math.random() * 2000).round();
    p3.setAI = true;
    p3.ai2 = true;
    PLAYERS[1].light = PLAYERS[1].heavy = 0;
    p3.factoryInLight = 1;
    p3.originalCities = 10;
    p3.casualties = 0;
    p3.generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8},"selected":false}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg"},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":true}}};
    p3.sumAllGeneralTraits;

    [pt(15, 16),pt(16, 16),pt(16, 17),pt(17, 17),pt(18, 17),pt(19, 17),pt(20, 17),pt(21, 17),pt(22, 17),pt(23, 17),pt(24, 17),pt(24, 18),pt(24, 19),pt(24, 20),pt(23, 20),pt(23, 21),pt(23, 22),pt(22, 23),pt(23, 23),pt(23, 23),pt(22, 24),pt(21, 25),pt(22, 25),pt(21, 25),pt(21, 26),pt(20, 26),pt(19, 26),pt(18, 26),pt(18, 27),pt(17, 27),pt(16, 27),pt(16, 28),pt(15, 28),pt(14, 28),pt(14, 29),pt(13, 29),pt(12, 28),pt(12, 27),pt(12, 26),pt(12, 25),pt(12, 24),pt(12, 23),pt(12, 22),pt(12, 21),pt(13, 21),pt(13, 20),pt(13, 19),pt(13, 18),pt(14, 18),pt(14, 17),pt(14, 16),pt(15, 15),pt(15, 18),pt(15, 17),pt(16, 17),pt(16, 18),pt(17, 18),pt(18, 18),pt(19, 18),pt(20, 18),pt(21, 18),pt(22, 18),pt(23, 18),pt(23, 19),pt(22, 19),pt(21, 19),pt(20, 19),pt(19, 19),pt(18, 19),pt(17, 19),pt(16, 19),pt(15, 19),pt(14, 19),pt(14, 20),pt(15, 20),pt(16, 20),pt(17, 20),pt(18, 20),pt(19, 20),pt(20, 20),pt(21, 20),pt(22, 20),pt(22, 21),pt(21, 21),pt(20, 21),pt(19, 21),pt(18, 21),pt(17, 21),pt(16, 21),pt(15, 21),pt(14, 21),pt(14, 22),pt(13, 22),pt(13, 23),pt(13, 24),pt(13, 25),pt(13, 26),pt(14, 26),pt(15, 26),pt(16, 26),pt(17, 26),pt(17, 25),pt(18, 25),pt(19, 25),pt(20, 25),pt(20, 24),pt(21, 24),pt(21, 23),pt(20, 23),pt(19, 23),pt(19, 24),pt(18, 24),pt(17, 24),pt(16, 24),pt(16, 25),pt(15, 25),pt(14, 25),pt(14, 24),pt(14, 23),pt(15, 23),pt(15, 22),pt(16, 22),pt(17, 22),pt(18, 22),pt(19, 22),pt(20, 22),pt(21, 22),pt(22, 22),pt(16, 23),pt(17, 23),pt(18, 23),pt(15, 24),pt(13, 27),pt(14, 27),pt(15, 27),pt(11, 30),pt(10, 30),pt(10, 30),pt(9, 31),pt(9, 32),pt(8, 32),pt(7, 32),pt(7, 31),pt(7, 30),pt(6, 30),pt(6, 29),pt(6, 28),pt(5, 28),pt(5, 27),pt(4, 27),pt(4, 26),pt(3, 26),pt(3, 27),pt(3, 28),pt(4, 28),pt(4, 29),pt(5, 29),pt(5, 30),pt(5, 31),pt(6, 31),pt(6, 32),pt(5, 32),pt(4, 32),pt(3, 32),pt(2, 32),pt(2, 31),pt(2, 30),pt(2, 29),pt(2, 28),pt(3, 29),pt(3, 30),pt(3, 31),pt(4, 31),pt(4, 30),pt(10, 38),pt(10, 39),pt(9, 39),pt(10, 31),pt(9, 31),pt(11, 31),pt(8, 33),pt(9, 34),pt(9, 35),pt(10, 35),pt(10, 36),pt(10, 36),pt(10, 37),pt(10, 38),pt(10, 37),pt(3, 33),pt(4, 33),pt(5, 33),pt(6, 33),pt(7, 33),pt(7, 33),pt(2, 33),pt(6, 40),pt(6, 39),pt(5, 39),pt(5, 38),pt(4, 38),pt(4, 37),pt(3, 37),pt(2, 37),pt(2, 36),pt(2, 35),pt(2, 34),pt(3, 34),pt(4, 34),pt(5, 34),pt(6, 34),pt(7, 34),pt(8, 34),pt(8, 34),pt(8, 34),pt(8, 34),pt(8, 35),pt(8, 35),pt(8, 36),pt(9, 36),pt(9, 37),pt(9, 38),pt(8, 38),pt(8, 39),pt(8, 40),pt(7, 40),pt(6, 40),pt(6, 41),pt(7, 41),pt(7, 40),pt(7, 39),pt(7, 38),pt(7, 37),pt(8, 37),pt(8, 36),pt(7, 36),pt(7, 35),pt(6, 35),pt(6, 34),pt(5, 35),pt(4, 35),pt(3, 35),pt(2, 35),pt(3, 35),pt(3, 36),pt(4, 36),pt(5, 36),pt(6, 36),pt(6, 37),pt(6, 38),pt(6, 37),pt(5, 37),pt(5, 36),pt(15, 45),pt(15, 44),pt(15, 45),pt(15, 45),pt(15, 46),pt(15, 46),pt(15, 46),pt(15, 45),pt(16, 44),pt(16, 44),pt(16, 43),pt(16, 42),pt(15, 43),pt(14, 43),pt(15, 42),pt(15, 41),pt(16, 41),pt(16, 40),pt(17, 40),pt(17, 39),pt(17, 38),pt(16, 38),pt(16, 37),pt(16, 38),pt(15, 39),pt(16, 39),pt(15, 40),pt(19, 39),pt(20, 39),pt(18, 39),pt(18, 41),pt(18, 42),pt(17, 42),pt(17, 41),pt(17, 40),pt(18, 40),pt(19, 40),pt(19, 41),pt(19, 42),pt(20, 41),pt(20, 40),pt(21, 40),pt(21, 41),pt(21, 42),pt(21, 43),pt(21, 44),pt(22, 44),pt(23, 45),pt(24, 45),pt(23, 45),pt(23, 44),pt(23, 43),pt(22, 43),pt(22, 42),pt(22, 41),pt(16, 30),pt(17, 30),pt(18, 30),pt(19, 30),pt(20, 30),pt(21, 30),pt(21, 31),pt(21, 32),pt(20, 32),pt(19, 32),pt(19, 33),pt(18, 33),pt(17, 33),pt(17, 34),pt(16, 34),pt(15, 34),pt(15, 33),pt(15, 32),pt(16, 32),pt(16, 31),pt(17, 31),pt(18, 31),pt(19, 31),pt(20, 31),pt(17, 32),pt(16, 32),pt(16, 33),pt(18, 32),pt(26, 34),pt(27, 34),pt(27, 33),pt(28, 33),pt(27, 36),pt(27, 37),pt(26, 37),pt(26, 36),pt(27, 35),pt(26, 35),pt(46, 34),pt(46, 33),pt(47, 33),pt(47, 34),pt(46, 35),pt(46, 34),pt(45, 34),pt(45, 33),pt(44, 33),pt(44, 32),pt(45, 32),pt(48, 33),pt(2, 38),pt(2, 39),pt(1, 39),pt(1, 40),pt(1, 41),pt(1, 42),pt(1, 43),pt(1, 44),pt(1, 45),pt(1, 46),pt(1, 47),pt(1, 48),pt(1, 49),pt(1, 50),pt(1, 51),pt(1, 52),pt(1, 53),pt(2, 53),pt(2, 54),pt(3, 54),pt(4, 54),pt(3, 54),pt(3, 55),pt(2, 55),pt(1, 55),pt(1, 54),pt(2, 52),pt(2, 53),pt(3, 53),pt(4, 53),pt(4, 54),pt(5, 54),pt(5, 53),pt(4, 53),pt(3, 53),pt(3, 52),pt(2, 51),pt(2, 50),pt(2, 49),pt(2, 48),pt(2, 47),pt(2, 46),pt(2, 45),pt(2, 44),pt(2, 43),pt(2, 42),pt(2, 41),pt(2, 40),pt(3, 40),pt(3, 39),pt(4, 39),pt(3, 38)].forEach(p => {
      p.prov.owner = 2;
      p.prov.supply = 4;
      (p.prov.divisions = p.prov.divisions.filter(() => Math.random() > 0.3)).forEach(d => d.playerID = 2);
      if (p.prov.terrain == 'U') {
        if (p.row <= 12) {
          p.prov.slots = Array(15).fill('F');
        }
        for (let i = 0;i < Math.random() * 5;i++)
          new Division(2, 'Militia Division', p, new Template(20000, 15, 5, 'Militia Division', 2, 1));
      }
      p.prov.divisions.forEach(d => { d.playerID = 2; d.morale = 2; d.skill = (d.skill * 1.5).max(4); d.action = []; });
    });

    diplomacy_change(0, 2, {status: 'PACT', changeAfter: timestamp+3600*24*366*(Math.random()*1.5+1), changeValue: {status: 'WAR'}});

    PLAYERS[2].manpower = PLAYERS[2].manpower.min(PLAYERS[0].manpower);
    PLAYERS[0].manpower /= 4;
    PLAYERS[0].growthRate /= 4;
    delete PLAYERS[1].ai2;
    PLAYERS[0].ai.attackOrderUntil = PLAYERS[2].ai.attackOrderUntil = timestamp + 3.154e+7;
    //PLAYERS[2].ai.attackOrderLastEnded = timestamp + 3.154e+7;

    pt(0, 0).prov.callTrigger = "ChinaDefectTrigger()";

    reinitCanvas();
  }
};

var ChinaDefectTrigger = function () {
  if (pt(0, 0).prov.callTrigger != 'ChinaDefectTrigger()') return false;
  if (diplomacy_get(0, 2).status=="WAR" && Math.random() > 0.95 && PLAYERS[0].cities && PLAYERS[2].cities) {
    MAP_DATA.forEach(row=>{row.forEach(col=>{if(col&&col.owner==0&&Math.random()>0.9&&col.divisions.length){col.owner=2;col.divisions.forEach(x => x.playerID=col.owner)}})});
    delete pt(0, 0).prov.callTrigger;
  }
}

var InvasionOfChinaOwners =
`                                 111111111111111111111111|
                                 111111111111111111111111|
                               11111111111111111111111111|
                              111111111111111111111111111|
                             1111111111111111111111111111|
                            11111111111111111111111111111|
                            11111111111111111111111111111|
                           111111111111111111111111111111|
                         11111111111111111111111111111111|
                        111111111111111111111111111111111|
                            1111  11111111111111111111111|
                              1    1111111111111111111111|
                                    111111111111111111111|
                                     11111111111111111111|
                                     111111 1111111111111|
                                               1111111111|
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
DDDRD   DDMMMRRRRMMMMDDDUD DMDDD  *RR  *  @@@@@@@@@@@@@@@|
DDDRD    DDMMMMMMMMMMDDDDRRRRRDDDR**   *  U  @@@@@@@@@@@@|
DDDRDDU   DD       DDDDRRD DMRRRRRM* U ***   @@@@@@@@@@@@|
RRRRRDDMM  D        RRRD  MMDMMMMM *     **   @@@@@@@@@@@|
RDDDDRDMMM   U    MMM  MMMDDDMDDDM*DD   RR*RR @@@@@@@@@@@|
DDDDDDRMMMM         M    DMMD   DDDMMD RR U  RRR@@@@@@@@@|
DDDDDDDRMMM         MMM M   U  MM UDMMDR      R@@@@@@@@@@|
DDDDDDMRMMM          MMMMMM     MM*MMDRR  M   UP@@@@@@@@@|
DDDDDDMRMMM  M MM MMMM    MMM     *MDRR MMM  U @@@@@@@@@@|
DDDDDMMMRMMM MMMMMMMMM RRRR M     *MMR MM        @@@@@@@@|
DDDDDMMMRMRMM MMMMM URRR  RRRRRR  *URRUM     U   @@@@@@@@|
DDDDMMMMMMRRMMMM MMMRRMM MMMRMMRRR*RR RRMMMMMMM  @@@@@@@@|
DDDMMMMMMMMMRRM   M  MMMM   RM *U**    RRMMMMMMM @@@@@@@@|
MMMMMMMMMMMMMR  M  MMMUM    RM *MRR   URR MMM   @@@@@@@@@|
MMMMMMMMMMMM RR      MM   RRRM *MMR    R  M M  @@@@@@@@@@|
MMMM   MMMM   R          RRU  **MMR MMM  MM M  @@@@@@@@@@|
       RRMM   R         RR  MU*MMRR U MMMMMMU @@@@@@@@@@@|
 RRRRRRRMMM   R         R   MMMMRR     MMMMM P@@@@@@@@@@@|
RR  RR  M    RR     U         M RMM    MMMM   @@@@@@@@@@@|
   RR RRM    R     MM         MRRMMM  MMMM M @@@@  @@@@@@|
   R R M    RR  MM MM      MMMRRMM   MMMMMMM @@@@PU@@@@@@|
   R RRM   RR    MMMM  MM M MMRUM  MMMMMMUM @@@@ MM@@@@@@|
   R  R   R   U  MM MMMM MMM  R*** MM    M  @@@@ M  @@@@@|
  R  RM  RR       MMM      MMMMMM*M      M @@@@@MP@@@@@@@|
    RRM  R       UMMM      MMMMMM*U**     @@@@@@@ @@@@@@@|
    R M           MM          MMM   * P@@@@@@@@@@@@@@@@@@|
   RRM            MM RRR            @P@@@@@@@@@@@@@@@@@@@|
   R MMMMMM      MMMM   RR         @@@@@@@@@@@@@@@@@@@@@@|
     MMMMMMMMMMMMM MMM U R       P@@@@@@@@@@@@@@@@@@@@@@@|
     MMMMMMMMM       MMM  R    @@@@@@@@@@@@@@@@@@@@@@@@@@`
	.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n').map((x, row) => (x.split('').map((v, col) => {
	  let o = InvasionOfChinaOwners[row][col] == '1' ? 1 : 0;
	  let slots = [];
	  if (v == 'U'){
      if (o == 1) slots = Array(3).fill('F').concat(['A', 'A', 'A']);
      else if(Math.random()>0.8) slots = Array(1).fill('F');
	  }
    if (!TERRAINS[v]) throw 'Not found.'
    return {terrain: v, supply: 1, owner: o, slots: slots, divisions: [], pt: pt(row, col)}

  })));

MAP_DATA = InvasionOfChinaTerrains;
pt(25, 42).prov.slots = Array(2).fill('F'); // Nanjing
pt(30, 35).prov.slots = Array(3).fill('F'); // Wuhan
pt(33, 22).prov.slots = Array(6).fill('F'); // Chongqing

pt(0, 0).prov.callTrigger = 'ChineseCivilWarTrigger()';


let p2 = new Player();
p2.color = 'rgba(140, 193, 226, 0.25)'
p2.retreatable = 30;
p2.manpower = Math.floor(Math.random() * 50000 + 6000000);
p2.growthRate = 0.0075;
p2._light = -100;
p2._heavy = -100;
p2.factoryInLight = 1;
let p1 = new Player();
p1.color = 'rgba(120, 40, 40, 0.25)';
p1.ai.attackOrderUntil = timestamp + 3.154e+7;
p1.manpower = Math.floor(Math.random() * 500000 + 2000000);
p1.growthRate = 0.0015;
p1._light = 100;
p1._heavy = 200;
p1.retreatable = 30;
p1.factoryInLight = 1;
p1.savedTemplates = [{"#":"Template","troop":28500,"light":32,"heavy":20,"defaultName":"步兵师团","support":10,"motorized":10},{"#":"Template","troop":8500,"light":14,"heavy":20,"defaultName":"炮兵联队","support":7,"motorized":0},{"#":"Template","troop":4500,"light":8,"heavy":10,"defaultName":"铁道联队","support":4,"motorized":5},{"#":"Template","troop":19000,"light":22,"heavy":14,"defaultName":"警备三单位制师团","support":8,"motorized":7},{"#":"Template","troop":8000,"light":4,"heavy":26,"defaultName":"装甲车队","support":2,"motorized":13},{"#":"Template","troop":18000,"light":6,"heavy":40,"defaultName":"装甲师团","support":3,"motorized":20},{"#":"Template","troop":4000,"light":6,"heavy":6,"defaultName":"侦察小队","support":3,"motorized":3}].map(x => {let t = new Template(x.troop, x.light, x.heavy, x.defaultName, x.support, x.motorized);t.defaultName = x.defaultName;x.irremovable=true;return t});
p2.savedTemplates = [{"#":"Template","troop":16000,"light":18,"heavy":8,"defaultName":"步兵军团","support":4,"motorized":1},{"#":"Template","troop":10000,"light":10,"heavy":4,"defaultName":"民兵团","support":2,"motorized":0}].map(x => {let t = new Template(x.troop, x.light, x.heavy, x.defaultName, x.support, x.motorized);t.defaultName = x.defaultName;return t});
p2.savedTemplates.push(new Template(10000, 12, 2, '步兵师', 3, 0))
p2.savedTemplates.push(new Template(8000, 9, 2, '步兵师', 1, 0))

let divisions = 0;

MAP_DATA.forEach((x, row) => (x.forEach((v, col) => {
  if (v.terrain == '@') return;
  if (v.terrain == 'P')
    PORTS.push(pt(row, col));
  if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 || v.terrain == 'P' || v.terrain == 'U')
    if (v.owner == 0) {
      if ((v.terrain == 'U' || v.terrain == 'P') && row >= 13 && col >= 20)
        v.divisions = Array(4).fill(0).map(() => (new Division(v.owner, `第${(++divisions).floor()}步兵师`, pt(row, col), new Template(Math.random() > 0.7 ? 10000 : 8500, 5+(Math.random()*3).round(), 2, 'Division', 1, 0))))
      else if (v.terrain == 'D' || (row < 11 && col < 31))
        v.divisions = Array(2).fill(0).map(() => (new Division(v.owner, `第${(++divisions).floor()}步兵师`, pt(row, col), new Template(Math.random() > 0.7 ? 10000 : 8500, 5+(Math.random()*3).round(), 2, 'Division', 1, 0))))
      else if (v.terrain != 'U')
        v.divisions = Array(Math.ceil(Math.random() * 3 + 2)).fill(0).map(() => (new Division(v.owner, `第${(++divisions).floor()}步兵师`, pt(row, col), new Template(Math.random() > 0.7 ? 9500 : 8500, 6+(Math.random()*3).round(), 1, 'Division', 1+(Math.random()*3).round(), 0))))
      if (row >= 25 && row <= 30 && col >= 45)
        v.divisions.map(x => {x.skill = 0.5 + Math.random();x.men = (Math.random() * 0.5 + 0.3) * x.template.troop;x.morale = Math.random();x.entrench = Math.random()});
      else
        v.divisions.map(x => {x.skill = 0.2 + Math.random();x.men = (Math.random() * 0.5 + 0.5) * x.template.troop;x.entrench = Math.random()});
    } else {
      v.divisions = [];
      let b = 3;
      if (!(row <= 6 || col <= 30)) {
        b = 2;
        v.divisions = Array((1).round()).fill(0).map(() => (new Division(v.owner, '步兵师团', pt(row, col), new Template(16000, 20, 12, 'Division', 5, 5))));
      }
      if (row > 6 && row <= 11 && col > 30) {
        Array((Math.random()).round()).fill(0).forEach(() => (new Division(v.owner, '装甲中队', pt(row, col), new Template(4000, 4, 12, 'Division', 2, 12))));
      }
      Array(v.terrain == 'U' ? 1 : b).fill(0).forEach(() => (new Division(v.owner, '步兵联队', pt(row, col), new Template(5000, 6, 4, 'Division', 3, 4))));
      v.divisions.forEach(x => x.skill = x.entrench = (Math.random()*2.5+1.5).round(2));
    }
})));
PORTS = PORTS.sort(() => (Math.random() - 0.5));
// Shanghai
pt(27, 46).prov.divisions = Array(9).fill(0).map(() => (new Division(1, '步兵师团', pt(27, 46), new Template(14000, 18, 14, 'Divsion', 9, 7))))
  .concat(Array(10).fill(0).map(() => (new Division(1, '步兵联队', pt(27, 46), new Template(4000, 8, 4, 'Tank Division', 3, 4)))))
  .concat(Array(3).fill(0).map(() => (new Division(1, '装甲中队', pt(27, 46), new Template(4000, 4, 12, 'Tank Division', 2, 12)))));
// Nanjing
pt(25, 43).prov.divisions = Array(2).fill(0).map(() => {
  let d = new Division(0, `第${++divisions}德械师`, pt(25, 43), new Template(16000, 20, 10, '', 10, 7))
  d.skill = 3;
  return d;
})
Array(5).fill(0).map(() => {
  let d = new Division(0, '南京警备', pt(25, 43), new Template(13000, 14, 6, 'Nanjing Garrisons', 7, 6))
  d.skill = (3 + Math.random()).round(2);
})
PLAYERS[0].generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8}}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg","selected":true},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":false}}};
PLAYERS[0].sumAllGeneralTraits;
PLAYERS[1].generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8}}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":true},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg","selected":true},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":false}}};
PLAYERS[1].sumAllGeneralTraits;
