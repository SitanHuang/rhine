var WWII1939Owners = `
00000000000000000000000000001110000111111111100010002200222222222222222222222222222222222|
00000000000000000000000000000000000011111111001100000200222222222222222222222222222222222|
00000000000000000000000000000000010001111111001100022220222222222222222222222222222222222|
00000000000000000000000000000001110001111111001000022222222222222222222222222222222222222|
00000000000000000000000000000011110000111111000000022222222222222222222222222222222222222|
00000000000000000000000000000011111000111111000000022222222222222222222222222222222222222|
00000000000000000000000000000011110000111000000000022222222222222222222222222222222222222|
00000000000000000000000000000011111111100000000000022222222222222222222222222222222222222|
000000000000000000000000000000011111000000000000000#2222222222222222222222222222222222222|
0000000000000000000000000000000111110000000000100111##22222222222222222222222222222222222|
000000000000000000000000000000011100000000001110011111##222222222222222222222222222222222|
0000000000000000000000000000000111111111001111111111111#222222222222222222222222222222222|
00000000000000000000000000000001111111111111111111111111###222222222222222222222222222222|
00000000000000000000000000000111111111111111111111111111111#22222222222222222222222222222|
00000000000000000000000000111111111111111111111111111111111#22222222222222222222222222222|
00000000000000000000000000111111111111111111111111111111111#22222222222222222222222222222|
00000000000000000000000001111111111111111111111111111111111#22222222222222222222222222222|
0000000000000000000000000011111111111111111111111111111111##22222222222222222222222222222|
000000000000000000000000000111111111111111111111111111111#2222222222222222222222222222222|
000000000000000000000110000011111111111111111111111111111#2222222222222222222222222222222|
0000000000000000000001000100111111111111111111111111111111#222222222222222222222222222222|
00000000000000000000111001011111111111111111111111111111111#22222222222222222222222222222|
00000000000000000000011111111111111111111111111111111111111#22222222222222222222222222222|
00000000000000000000000011000111111111111111111111111111111#22222222222222222222222222222|
0000000000000000000000000000000111111111111111111111111111#222222222222222222222222222222|
0000000000000000000000000000000011111111111111111111111111#222222222222222222222222222222|
00000000000000000000000000000000111111111111111111111111111##2222222222222222222222222222|
0000000000000000000000000000000011111111111111111111111111111##22222222222222222222222222|
000000000000000000000000000000001111111111111111111111111111111#2222222222222222222222222|
0000000000000000000000000000000111111111111111111111111111111111##22222222222222222222222|
000000000000000000000000000000011111111111111111111111111111111111#2222222220222222222222|
00000000000000000000000000000001111111111111111111111111111111111110222220000022222222222|
00000000000000000000000000000001111111111111111111111111111111111100000200000222222222222|
00000000000000000000000000000011111111011111111111111111111111111000022222222222222222222|
00000000000000000000000000000111111111001111111111111111111111111000000222002222222222222|
00000000000000000000000000000111111111000111111111111111111111110000002200000022222222222|
00000000000000000000000000000110011111000111111111111111111111100000000000000000022222222|
00000000000000000000000000000000001111110001111111111111111111100000000000000000022222222|
00000000000000000000000000000000001111110000111111111111111111000000000000000000000002222|
00000000000000000000000000000000000111110000001111111111111111000000000000000000000000000|
00000000000000000000000000000000000011111100000011111111111111000000000000000000000000000|
00000000000000000000000000000000000001111110000011111111111111000000000000000000000000000|
00000000000000000000000000000000000000111111100011111111111110000000000000000000000000000|
00000000000000000000000000000001100000001111110011111111100000000000000000000000000000000|
00000000000000000000000000000001100000000111110001111111100000000000000000000000000000000|
00000000000000000000000000000001100000000011100001111100000000000000000000000000000000000|
00000000000000000000000000000001100000000001100000111110000000000000000000000000000000000|
00000000000000000000000000000000000000000001000000111110000000000000000000000000000000000|
00000000000000000000000000000000000000101111000000110000000000000000000000000000000000000|
00000000000000000000000000000000000001111100000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000011100000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000000100000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|`
.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n');


var WWIITerrains = `
@@@@@mmf@fmmm@@@@@@@@@@@@@@@  p@@@@         c@@@ @@@ff@@fffffffCfffffffffffffffffffffffff|
@@@@@mf@fmmmmmm@@@@@@@@@@@@@@@@@@@@@        @@  @@@@@C@@cff*****fffffffffff  f ff  f ffff|
@@@@@fmmmmmmmmf@@@@@@@@@@@@@@@@@@ @@@       @@  @@@ff**@fff*cfffff ff fff  fff    fffff  |
@@@@@@@mmmmmmff@@@@@@@@@@@@@@@@c**@@@c      @@ @@@@fff*ff***fffffff ffff  ****c  fff fff |
@@@@@@@mmmcmmc@@@@@@@@@@@@@@@@  * @@@@      @@@@@@@fff****ffff fffc********ff          ff|
@@@@@@p@@ffmm*@@@@@@@@@@p@@@@@  *  @@@    cp@@@@@@@ ffcfff  ffffffffffffffffffff  ff ffff|
@@@@@@@@@fmm**@@@@@@@@@@@@@@@@ ** @@@@   @@@@@@@@@@fff*ffffffrrrrrrrrff fffffffffffffffff|
@@@@@@@@@@  *  @@@@@@@@@@@@@@@p*   c r @@@@@@@@@@@@fff*ffffffrf fff rrff ffff  ffffffrrrr|
@@@@@@@@@@m *m  @@@@@@@@@@@@@@@*    @@@@@@@@@@@@@@@******cffrrfff  ffrrfff  C  fffrrrrfff|
@@@@fm c@@ m*mm @@@@@@@@@@@@@@@**   @@@@@@@@@@ @@*cf fffffffrf f   f frrff  *  rrrrfffff |
@@@@fm   @@@*mmm @@@@@@@@@@@@@@ * @@@@@@@@@@f  @@* f  ffrrrrrf fc******rrrrrrrrrfff fff f|
@fffff   @@m***  p@@@@@@@@@@@@@ *      @@  ff*cr**  f fffffffff** f fffffffff*fff        |
@mmfm   @@@@@mC m @@@@@@@@@@@@@r***        ff*f rff   ff ff*c***fff ffffff ff*fff       c|
@        @ @Cm**  @@@@@@@@@@@ prr c*f     ff * rr       ff**f  frrrffffffffff*f          |
@@  mff @@ mm  *  p@@@@@@@      rrr****C  ff *rr      **c**f frrr ffff ff ****           |
@@   fcp@@  m  ***C p@@@@@       f**fff*fff****c****c**    ff r fffffc***c*ffff          |
@   ff  @@@ m    *   @@@@  c**c   *rrmm**C**f rrrff          frfffffffffff*ffff          |
@m mff@@@ mm  rr Crp@@@@ rrr  ****cmrrrmf *f  ffrr           frrffff fffff*f         fff |
@@ p@@@@@  m   rrrr@@@@    rrrmm  * m rf f*ff  f rrr      c  ffrrf ffff   **   ffff      |
@@@@@@@@@@@C******p@@ p   fffrmmm** mmrr  *        rrr**********rrf    f   ***           |
@@@@@@@@@@ *    p@@@@    cfffrrr** m   rrrrmm  f c**fr        f******c*ff    *f   f      |
@@@@@@@@@  p@@@@@@@@     m****c*m  m  fmmmrmm   f  * r        f  frr  ****f***c      fff |
@@@@@@@@pc@@@@@@@@@     f**fmrrr mm  fmm cr  mm    **rc        c f rr   ff    **   ffff  |
@@@@@@@@@@@@@@@ @@       *fmmrmfff   ffm  r  fmfff * rrrr    f   f  rrf   f  f ********c |
@@@@@@@@@@@@@@@ p    c**** m rrfmf mm mfm*r  mmmmff*ffffrrrrr        rr         f        |
@@@@@@@@@@  f       **f*  fffmrfmrrrrrrf**m mfmmmmm*mmmmmfffrr fff    rrr f  f           |
@@@@@@@@  cff      **ff**c ffmrmmrfc  rf*fffmmmmmmm*mmmmmmcffrrf        r           f    |
@@@@@@@@@@ffff   *** fmm  ffm rrrrfff rm*ffffff  ***m     mmmfr      ***r**C             |
@@@@@@@@@@@@   c**  f m  ffmm  mmmmmmmrrcffff    *        m mfr c***** rr  **    f**C    |
@@@@@@@@@@@@@p   * rrrrr f     mmmmmm****rmff    c         mmmrr      rr  f **c****      |
@@@@@@@@@@@@@@rrr*rr   rr     mmmmm***mmmrrf     *   mmm  fmmffr    rrr*    @            |
@@@@@@@@@@@@@@@  **  f cr f rrrfmmm*mmmm fr    ***   fff  fmff rr  @r  * @@@@@       fff |
@@@@@@@@@@@@@@@f  *fmf  r  rrmmfffm*f***ffr c***    mfffff m    r @@@@@r@@@@@       fff  |
@@@@@@@@@@@@@@@fff*mmfmfrmrrrmmc ff*fC@***r          mffmfmmc rrr@@@@  *ff r             |
@@@@@@@@@@@@@@@fc****fffmrrmmm rrrr*  @@ffrrrmm  m    mmmmm**rr  @@@@@@cff@@   Cf  f  f  |
@@@@@@@@@@@@@@fffffm*mfmrrfmm*******r @@@ mfrf       mmm  **rrff@@@@@@C @@@@@@     ff fff|
@@@@@@@@@@@@@mmff   **********f@@fm*rr@@@ cfrrfc  m m     *rr f@@@@@@@@@@@@@@@@@@22mmmmmm|
@@@@@@@@@@@@@mm    fcmmfrcmcm@@@@@m*mm c@@@  rr  mfff     *    @@@@@@@@@@@@@@@@@@  mmcmmm|
@@@@@@@@@@@@@@@mmmmmmmm@@@mp@@@@f@f**mm @@@@pcrrrrr f********p@@@@@@@@@@@@@@@@@@@@@@@ mmm|
@@@@@@@@@@@@@@@@@@mmmmm@@@@@@@@ff@@f**mm@@@@@@  ffrrrr  c     @@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fp@@@fCfm  @@@@@@ fc**rrrm    f@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fc@@@@pfmm  @@@@@ f  m crfffff @@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@r@@@@@ mfm c @@@ mm fmmrrrrrr@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ c@@@@@@@cmm   @@ fff m m @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ f@@@@@@@@fmm @@@fmff f  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ f@@@@@@@@@fm @@@@f mm @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@pf@@@@@@@@@@m @@@@@ffmmff@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@m@@@@@@c  mfff@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@c@fmrm@@@@@@@ f ff @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@p  mm@@@@@@@@@@r@@ c@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@  p@@@@@d@@  c@@@@  c@@@@@@@@@@ffrr@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@  d  c         p@@@@@ @@@@@@@@@@ fc@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@   dddddddddddd  @@@@@@@@@@@@@@@@@@@p@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@p@@@@@@  cdddmmmmmmmddddd @@dpd@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@c      c  mmmmmmmmmmmmmmmdd c@@@@@@@@@@@@@@@@@@@@mpcm@@@@@@@@@mcp@@@@@@@@@@@@@@@@@|`
.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n');

function load1939Scenario() {
  clearData();
  // ============== map =================
  MAP_DATA = WWIITerrains.map((x, row) => (x.split('').map((v, col) => {
    let isBorder = WWII1939Owners[row][col] == '#';
    let o = isBorder ? 1 : parseInt(WWII1939Owners[row][col]);
    let slots = [];
    let terrain = '@';
    if (v == 'c'){
      terrain = 'U';
      slots = Array(1).fill('F');
    } else if (v == 'C') {
      terrain = 'U';
      slots = Array(10).fill('F');
    } else if (v == 'p' || v == 'm' || v == ' ' || v == 'f' || v == 'd' || v == 'r' || v == '*') {
      terrain = v.toUpperCase();
    }
    if (!TERRAINS[terrain]) throw 'Not found ' + v;
    let _col = {supply: 4, terrain: terrain, owner: o, slots: slots, divisions: [], pt: pt(row, col)};

    if (terrain != '@' && row >= 23 && row <= 40 && col >= 8 && col <= 28) {
      _col.transferOwner = {cityFalls: [24, 21, 1], newOwner: 1};
    }

    if (isBorder) {
      //return {terrain: '@', owner: -1, slots: [], divisions: [], pt: pt(row, col), waitUntil: {time: -900241200, col: _col}};
      return {terrain: ' ', owner: 1, slots: [], divisions: [], pt: pt(row, col)};
    } else {
      return _col;
    }
  })));

  window.PORTS = [];
  PLAYERS.forEach(x => delete x._mapDataFlattened);

  // ============== players =================

  PLAYERS[0].color = "rgba(140, 193, 226, 0.2)";
  PLAYERS[0].generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8}}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg","selected":false},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":true}}};
  PLAYERS[0].sumAllGeneralTraits;
  PLAYERS[0].manpower = 5500000;
  PLAYERS[0].casualties = 0;
  PLAYERS[0].divisionMen = 0;
  PLAYERS[0].factories = 0;
  PLAYERS[0].growthRate = 150187/47080000; // 0.0029563933
  PLAYERS[1].color = "rgba(96, 96, 96, 0.2)";
  PLAYERS[1].manpower = 3500000;
  PLAYERS[1].casualties = 0;
  PLAYERS[1].divisionMen = 0;
  PLAYERS[1].factories = 0;
  // PLAYERS[1].growthRate = 482790/67349000; // 0.0071684806
  PLAYERS[1].growthRate = 0.003;

  PLAYERS[0].light = 0;
  PLAYERS[0].heavy = 0;
  PLAYERS[1].light = -100;
  PLAYERS[1].heavy = -100;

  PLAYERS[1].generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8},"selected":false}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg","selected":true},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg"}}};
  PLAYERS[1].sumAllGeneralTraits;

  window.p3 = PLAYERS[2] || new Player();
  p3.color = 'rgba(150, 0, 0, 0.2)';
  p3.manpower = 10000000;
  p3.growthRate = 2012000/162039470; // 0.01241672785
  p3.light = -1500;
  p3.factories = 0;
  //p3.constructionPoints = 6500;
  p3.heavy = -1000;
  p3.factoryInLight = 1;
  p3.generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8},"selected":false}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg"},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":true}}};
  p3.sumAllGeneralTraits;

  PLAYERS[1].diplomacy = {};
  PLAYERS[1].diplomacy[p3.playerID] = {warUntil: -900241200};
  PLAYERS[1].ai.attackOrderUntil = -925487144;
  p3.diplomacy = {};
  p3.diplomacy[PLAYERS[1].playerID] = {warUntil: -900241200};

  // ============== military =================

  let british = new Template(12100, 18, 9, 'British Division', 9, 3);
  let american = new Template(11600, 18, 8, 'US Infantry Division', 9, 4);
  let french = new Template(11090, 12, 6, 'French Division', 2, 1);
  let german = new Template(17000, 26, 16, 'Infanterie-Division', 13, 8);
  let germanSS = new Template(14000, 24, 20, 'Waffen-SS Division', 12, 7);
  let italian = new Template(10000, 16, 7, 'Intalian Infantry Division', 8, 3);
  let germanPanzerI = new Template(15050, 4, 30, 'Panzer Corps', 2, 30);
  let germanPanzerII = new Template(17000, 6, 40, 'Panzer II Corps', 3, 40);
  let germanPanzer = new Template(17950, 6, 55, 'Panzer III Corps', 3, 55);
  let germanMotorized = new Template(17000, 14, 23, 'Motorized Division', 7, 23);
  let germanArtillery = new Template(8500, 2, 40, 'Anti-Tank Regiment', 1, 7);
  let germanCombinedArms = new Template(20000, 24, 42, 'Combined Arms Crops', 12, 42);
  let soviet = new Template(14000, 12, 6, 'Rifle Division', 2, 1);
  let sovietMilitia = new Template(9000, 8, 1, 'Militia Division', 0.1, 0.1);
  let sovietTank = new Template(12000, 4, 34, 'Tank Division', 2, 34);
  let sovietTank2 = new Template(6000, 2, 15, 'Tank Regiment', 1, 5);
  let sovietMech = new Template(16000, 16, 30, 'Mechanized Corps', 6, 20);
  let sovietMech2 = new Template(6000, 6, 12, 'Mechanized Regiment', 3, 2);

  //german.irremovable = germanPanzerI.irremovable = germanPanzerII.irremovable = germanPanzer.irremovable = british.irremovable = american.irremovable = soviet.irremovable = true;
  germanPanzerII.irremovable = german.irremovable = germanSS.irremovable = germanCombinedArms.irremovable = germanPanzerII.irremovable = germanPanzer.irremovable = british.irremovable = american.irremovable = soviet.irremovable = true;

  PLAYERS[0].savedTemplates = [british.deepClone(), american.deepClone()];
  PLAYERS[1].savedTemplates = [german.deepClone(), germanSS.deepClone(), italian.deepClone(), germanPanzer.deepClone(), germanPanzerI.deepClone(), germanPanzerII.deepClone(), germanMotorized.deepClone(), germanArtillery.deepClone(), germanCombinedArms.deepClone()];
  PLAYERS[2].savedTemplates = [soviet.deepClone(), sovietMilitia.deepClone(), sovietTank.deepClone(), sovietMech.deepClone(), sovietTank2.deepClone(), sovietMech2.deepClone()];

  let british_i = 0;
  let german_i = 0;
  let soviet_i = 0;

  MAP_DATA.forEach((x, row) => (x.forEach((v, col) => {
    v.supply = 4;
    if (v.terrain == '@') return;
    if (v.terrain == 'P')
      PORTS.push(pt(row, col));
    if (v.owner == 0) {
      let type = Math.random() < 0.7 ? british : american;
      let num = row >= 17 && row <= 21 && col >= 22 && col <= 27 ? 3 : 0;
      if (v.terrain == 'P' || v.terrain == 'U')
        v.divisions = Array((Math.random() * 3).round() + 1 + num).fill(0).map(() => (new Division(v.owner, ++british_i + 'th ' + type.defaultName, pt(row, col), type)));
      else if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0) {
        v.divisions = Array((Math.random() * 2).round() + 1 + num).fill(0).map(() => (new Division(v.owner, ++british_i + 'th French Division', pt(row, col), french)));
      }
      if (row >= 23) {
        v.divisions.map(x => {x.morale = 0.2 + Math.random() * 0.3;x.men = (Math.random() * 0.5 + 0.3) * x.template.troop;});
      }
    } else if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 || v.terrain == 'P' || v.terrain == 'U')
      if (v.owner == 1 && (v.terrain != 'U' || (col == 25 && row == 20)) && !(col >= 51 && row <= 30)) {
        let type = Math.random() < 0.9 ? (row < 35 ? german : italian) : germanPanzer;
        let num = 0;
        if (row >= 19 && row <= 23 && col >= 21 && col <= 27) {
          num += (Math.random() * 4).round();
        }
        v.divisions = Array((Math.random() * 1.5).round() + 1 + num).fill(0).map(() => {
        if (row >= 19 && row <= 23 && col >= 21 && col <= 27) {
          type = Math.random() > 0.8 || !(col == 21 && row == 22) ? (Math.random() > 0.3 ? german : germanMotorized) : (Math.random() > 0.2 ? (Math.random() > 0.5 ? germanPanzerII : germanPanzerI) : germanPanzer);
        }
          return new Division(v.owner, ++german_i + 'th ' + type.defaultName, pt(row, col), type)
        });
        v.divisions.map(x => {x.skill = (type == germanPanzer ? 3 : 1) + Math.random();x.morale = 2;});
      } else if (v.owner == 2 && (v.terrain == 'P' || v.terrain == 'U')) {
        let type = Math.random() < 0.4 ? soviet : sovietMilitia;
        v.divisions = Array((Math.random() * 1).round() + 3).fill(0).map(() => (new Division(v.owner, ++soviet_i + 'th ' + type.defaultName, pt(row, col), type)));
        v.divisions.map(x => {x.skill = 0.3 + Math.random();x.men = (Math.random() * 0.5 + 0.3) * x.template.troop;});
      }

    v.divisions.forEach(x => x.supply = 4);
  })));
  //MAP_DATA[22][21].divisions.forEach(x => x.action = [pt(23,21),pt(24,21)]);

  pass();pass();pass();

  // ============= misc ==============
  window.timestamp = -935539200; // 5/10/1940
  PLAYERS[1].ai.attackOrderLastStarted = timestamp;
  window.timeIncrement = 518400 / 2; // 3 days

  reinitCanvas();
  updateInterfaceOnPass();

  diplomacy_change(PLAYERS[0].playerID, PLAYERS[2].playerID, {status: 'PACT', changeAfter: -694310400, changeValue: {status: 'WAR'}});
  diplomacy_change(PLAYERS[1].playerID, PLAYERS[2].playerID, {status: 'PACT', changeAfter: -900241200, changeValue: {status: 'WAR'}});

  pt(0, 0).prov.callTrigger = "trigger_german_ai_attack()";

}
function trigger_german_ai_attack() {
  if (diplomacy_get(1,2).status == 'WAR') {
    PLAYERS[1].ai.attackOrderUntil = -900241200 + 1.051e+7;
    pt(0, 0).prov.callTrigger = "";
  }
}
