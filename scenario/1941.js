var WWII1941Owners = `
00000000000000000000000000001110000111111111100010002200222222222222222222222222222222222|
00000000000000000000000000000000000011111111001100000200222222222222222222222222222222222|
00000000000000000000000000000000010001111111001100022220222222222222222222222222222222222|
00000000000000000000000000000001110001111111001000022222222222222222222222222222222222222|
00000000000000000000000000000011110000111111000000022222222222222222222222222222222222222|
00000000000000000000000000000011111000111111000000022222222222222222222222222222222222222|
00000000000000000000000000000011110000111000000000022222222222222222222222222222222222222|
00000000000000000000000000000011111111100000000000022222222222222222222222222222222222222|
00000000000000000000000000000001111100000000000000022222222222222222222222222222222222222|
00000000000000000000000000000001111100000000001001112222222222222222222222222222222222222|
00000000000000000000000000000001110000000000111001111122222222222222222222222222222222222|
00000000000000000000000000000001111111110011111111111112222222222222222222222222222222222|
00000000000000000000000000000001111111111111111111111111222222222222222222222222222222222|
00000000000000000000000000000111111111111111111111111111111222222222222222222222222222222|
00000000000000000000000000111111111111111111111111111111111222222222222222222222222222222|
00000000000000000000000000111111111111111111111111111111111222222222222222222222222222222|
00000000000000000000000001111111111111111111111111111111111222222222222222222222222222222|
00000000000000000000000011111111111111111111111111111111111222222222222222222222222222222|
00000000000000000000000111111111111111111111111111111111112222222222222222222222222222222|
00000000000000000000011111111111111111111111111111111111112222222222222222222222222222222|
00000000000000000000011111111111111111111111111111111111111222222222222222222222222222222|
00000000000000000000111111111111111111111111111111111111111122222222222222222222222222222|
00000000000000000001111111111111111111111111111111111111111122222222222222222222222222222|
00000000000000010011111111111111111111111111111111111111111122222222222222222222222222222|
00000000000000011111111111111111111111111111111111111111111222222222222222222222222222222|
00000000001111111111111111111111111111111111111111111111111222222222222222222222222222222|
00000000111111111111111111111111111111111111111111111111111112222222222222222222222222222|
00000000001111111111111111111111111111111111111111111111111111122222222222222222222222222|
00000000000011111111111111111111111111111111111111111111111111112222222222222222222222222|
00000000000001111111111111111111111111111111111111111111111111111122222222222222222222222|
00000000000000111111111111111111111111111111111111111111111111111112222222220222222222222|
00000000000000011111111111111111111111111111111111111111111111111110222220000022222222222|
00000000000000011111111111111111111111111111111111111111111111111100000200000222222222222|
00000000000000011111111111111111111111011111111111111111111111111000022222222222222222222|
00000000000000011111111111111111111111001111111111111111111111111000000222002222222222222|
00000000000000111111111111111111111111000111111111111111111111110000002200000022222222222|
00000000000001111111111111111110011111000111111111111111111111100000000000000000022222222|
00000000000001111111111111111000001111110001111111111111111111100000000000000000022222222|
00000000000000011111111000110000101111110000111111111111111111000000000000000000000002222|
00000000000000000011111000000001100111110000001111111111111111000000000000000000000000000|
00000000000000000000000000000001100011111100000011111111111111000000000000000000000000000|
00000000000000000000000000000001100001111110000011111111111111000000000000000000000000000|
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
@@@@@@@@@@@@@@@fc****fffmrrmmm rrrr*  @@ffrrrmm  m    mmmmm**rr  @@@@@@cff@@   cf  f  f  |
@@@@@@@@@@@@@@fffffm*mfmrrfmm*******r @@@ mfrf       mmm  **rrff@@@@@@c @@@@@@     ff fff|
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

function load1941Scenario() {
  clearData();
  // ============== map =================
  MAP_DATA = WWIITerrains.map((x, row) => (x.split('').map((v, col) => {
    let o = parseInt(WWII1941Owners[row][col]);
    let slots = [];
    let terrain = '@';
    if (v == 'c'){
      terrain = 'U';
      slots = Array(1).fill('F');
    } else if (v == 'C') {
      terrain = 'U';
      slots = Array(6).fill('F');
    } else if (v == 'p' || v == 'm' || v == ' ' || v == 'f' || v == 'd' || v == 'r' || v == '*') {
      terrain = v.toUpperCase();
    }
    if (!TERRAINS[terrain]) throw 'Not found ' + v;
    return {supply: 4, terrain: terrain, owner: o, slots: slots, divisions: [], pt: pt(row, col)}
  })));

  window.PORTS = [];
  PLAYERS.forEach(x => delete x._mapDataFlattened);

  // ============== players =================

  PLAYERS[0].color = "rgba(140, 193, 226, 0.2)";
  PLAYERS[0].generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8}}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg","selected":false},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":true}}};
  PLAYERS[0].sumAllGeneralTraits;
  PLAYERS[0].manpower = 11500000;
  PLAYERS[0].casualties = 2500000;
  PLAYERS[0].divisionMen = 0;
  PLAYERS[0].factories = 0;
  PLAYERS[0].growthRate = 149187/47080000 + 0.00395; // 0.0029563933
  PLAYERS[1].color = "rgba(96, 96, 96, 0.2)";
  PLAYERS[1].manpower = 5500000;
  PLAYERS[1].casualties = 300000;
  PLAYERS[1].divisionMen = 0;
  PLAYERS[1].factories = 0;
  // PLAYERS[1].growthRate = 482790/67349000; // 0.0071684806
  PLAYERS[1].growthRate = 0.004168;

  PLAYERS[0].light = 1000;
  PLAYERS[0].heavy = 2000;
  PLAYERS[1].light = -100;
  PLAYERS[1].heavy = -100;

  PLAYERS[1].generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":false},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8},"selected":true}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg","selected":true},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg"}}};
  PLAYERS[1].sumAllGeneralTraits;

  window.p3 = new Player();
  p3.color = 'rgba(150, 0, 0, 0.2)';
  p3.manpower = 14000000;
  p3.growthRate = 2012000/162039470; // 0.01241672785
  p3.light = 1000;
  p3.factories = 0;
  p3.heavy = 500;
  p3.factoryInLight = 1;
  p3.generals = {"Generalissimo":{"Chiang Kai-Shek":{"desc":"President, Republic Of China","path":"scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg","mod":{"o":1.1,"b":1.1,"s":1,"e":1.1},"selected":true},"Game Founder":{"desc":"Programmer","path":"scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg","mod":{"o":0.8,"b":1.4,"s":1.2,"e":0.8},"selected":false}},"Field Marshal":{"Hu Zong-Nan":{"desc":"Eagle of the Northwest","path":"scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg","mod":{"o":1.3,"b":0.9,"s":0.8,"e":0.9},"selected":true},"Li Zong-ren":{"desc":"Vice President, Republic Of China","path":"scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg","mod":{"o":1,"b":1.3,"s":0.8,"e":1},"selected":false},"Gao Zhi-hang":{"desc":"Modern Warfare Expert","mod":{"o":0.8,"b":1.3,"s":1.3,"e":0.7},"path":"scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg","selected":false},"Zhu De":{"desc":"Pioneers of Liberation","mod":{"o":1.3,"b":1.2,"s":0.9,"e":0.8},"path":"scenario/ChineseGenerals/FieldMarshalZhuDe.jpg"},"Xiao Yi-Su":{"desc":"Minister of National Defense, Republic Of China","mod":{"o":1,"b":0.8,"s":0.7,"e":1.5},"path":"scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg","selected":true}}};
  p3.sumAllGeneralTraits;

  // ============== military =================

  let british = new Template(12100, 18, 9, 'British Division', 9, 3);
  let american = new Template(11600, 18, 8, 'US Infantry Division', 9, 4);
  let french = new Template(11090, 12, 6, 'French Division', 2, 1);
  let german = new Template(17000, 24, 14, 'Infanterie-Division', 12, 7);
  let italian = new Template(10000, 16, 6, 'Intalian Infantry Division', 8, 3);
  let germanPanzerI = new Template(15050, 4, 30, 'Panzer Corps', 2, 30);
  let germanPanzerII = new Template(17000, 6, 40, 'Panzer II Corps', 3, 40);
  let germanPanzer = new Template(17950, 6, 55, 'Panzer III Corps', 3, 55);
  let germanMotorized = new Template(17000, 14, 23, 'Motorized Division', 7, 23);
  let germanArtillery = new Template(4000, 1, 20, 'Anti-Tank Brigade', 1, 1);
  let germanCombinedArms = new Template(20000, 24, 42, 'Combined Arms Crops', 12, 42);
  let soviet = new Template(14100, 16, 10, 'Rifle Division', 5, 2);
  let sovietMilitia = new Template(10000, 8, 1, 'Militia Division', 0.1, 0.1);
  let sovietTank = new Template(12000, 4, 34, 'Tank Division', 2, 34);
  let sovietTank2 = new Template(6000, 2, 15, 'Tank Regiment', 1, 5);
  let sovietMech = new Template(16000, 16, 30, 'Mechanized Corps', 6, 20);
  let sovietMech2 = new Template(6000, 6, 12, 'Mechanized Regiment', 3, 2);

  //german.irremovable = germanPanzerI.irremovable = germanPanzerII.irremovable = germanPanzer.irremovable = british.irremovable = american.irremovable = soviet.irremovable = true;
  germanPanzerII.irremovable = german.irremovable = germanCombinedArms.irremovable = germanMotorized.irremovable = germanPanzer.irremovable = british.irremovable = american.irremovable = soviet.irremovable = sovietMech.irremovable = sovietTank2.irremovable = true;

  PLAYERS[0].savedTemplates = [british.deepClone(), american.deepClone()];
  PLAYERS[1].savedTemplates = [german.deepClone(), italian.deepClone(), germanPanzer.deepClone(), germanPanzerI.deepClone(), germanPanzerII.deepClone(), germanMotorized.deepClone(), germanArtillery.deepClone(), germanCombinedArms.deepClone()];
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
      if (v.terrain == 'P' || v.terrain == 'U')
        v.divisions = Array((Math.random() * 2).round() + 1).fill(0).map(() => (new Division(v.owner, ++british_i + 'th ' + type.defaultName, pt(row, col), type)));
      else if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0)
        v.divisions = Array((Math.random() * 3).round() + 1).fill(0).map(() => (new Division(v.owner, ++british_i + 'th Greek Division', pt(row, col), soviet)));
    } else if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 || v.terrain == 'P' || v.terrain == 'U')
      if (v.owner == 1 && v.terrain != 'U') {
        let type = Math.random() < 0.9 ? (Math.random() < 0.8 ? german : italian) : germanPanzer;
        v.divisions = Array((Math.random() * 1).round() + 2).fill(0).map(() => (new Division(v.owner, ++german_i + 'th ' + type.defaultName, pt(row, col), type)));
        v.divisions.forEach(x => x.skill = Math.random() * 2 + 1);
      } else if (v.owner == 2) {
        let type = Math.random() < 0.4 ? soviet : sovietMilitia;
        v.divisions = Array((Math.random() * 2).round() + 2).fill(0).map(() => (new Division(v.owner, ++soviet_i + 'th ' + type.defaultName, pt(row, col), type)));
        v.divisions.forEach(x => x.skill = Math.random() * 0.5);
      }

    v.divisions.forEach(x => x.supply = 4);
  })));

  pass();pass();pass();

  // ============= misc ==============
  window.timestamp = -900241200; // 6/22/1941
  window.timeIncrement = 518400 / 2; // 3 days

  reinitCanvas();
  updateInterfaceOnPass();

  diplomacy_change(PLAYERS[0].playerID, PLAYERS[2].playerID, {status: 'PACT', changeAfter: -694310400, changeValue: {status: 'WAR'}});
}
