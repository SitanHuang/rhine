var WWIIOwners = `
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
00000000000000000000000000000001100000000001100000111111000000000000000000000000000000000|
00000000000000000000000000000000000000000001000000111111100000000000000000000000000000000|
00000000000000000000000000000000000000101111000000111111100000000000000000000000000000000|
00000000000000000000000000000000000001111100000000001001100000000000000000000000000000000|
00000000000000000000000000000000000000011100000000001111000000000000000000000000000000000|
00000000000000000000000000000000000000000100000000001100000000000000000000000000000000000|
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000|`
.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n');


var WWIITerrains = `
@@@@@mmf@fmmm@@@@@@@@@@@@@@@  p@@@@         c@@@ @@@ff@@fffffffcfffffffffffffffffffffffff|
@@@@@mf@fmmmmmm@@@@@@@@@@@@@@@@@@@@@        @@  @@@@@c@@fffffffffffffffffff  f ff  f ffff|
@@@@@fmmmmmmmmf@@@@@@@@@@@@@@@@@@ @@@       @@  @@@ffff@ffffcfffff ff fff  fff    fffff  |
@@@@@@@mmmmmmff@@@@@@@@@@@@@@@@   @@@       @@ @@@@ffffffffffffffff ffff  fff c  fff fff |
@@@@@@@mmmcmmc@@@@@@@@@@@@@@@@    @@@@      @@@@@@@fffffffffff fffcfffffff ff          ff|
@@@@@@p@@ffmm @@@@@@@@@@p@@@@@     @@@     p@@@@@@@ ffcfff  ffffffffffffffffffff  ff ffff|
@@@@@@@@@fmm  @@@@@@@@@@@@@@@@    @@@@   @@@@@@@@@@ffffffffffrrrrrrrrff fffffffffffffffff|
@@@@@@@@@@     @@@@@@@@@@@@@@@p    c r @@@@@@@@@@@@ffffffffffrf fff rrff ffff  ffffffrrrr|
@@@@@@@@@@m  m  @@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@ffff fcffrrfff  ffrrfff  C  fffrrrrfff|
@@@@fm  @@   mm @@@@@@@@@@@@@@@     @@@@@@@@@@ @@ cf fffffffrf f   f frrff     rrrrfffff |
@@@@fm   @@@mm m @@@@@@@@@@@@@@   @@@@@@@@@@f  @@  f  ffrrrrrf fc f ff rrrrrrrrrfff fff f|
@fffff   @@ mm   p@@@@@@@@@@@@@        @@  ff cr    f fffffffff f f fffffffff fff        |
@mmfm   @@@@@mC m @@@@@@@@@@@@@r           ffff rff   ff ff c fffff ffffff ffffff        |
@        @ @Cm    @@@@@@@@@@@ prr c f     ff   rr       fffff  frrrffffffffffff          |
@@  mff @@ mm     p@@@@@@@      rrrrff C  ff  rr        c  f frrr ffff ff ff f           |
@@   fcp@@  m     C p@@@@@       ffrfffffff   rc f  c      ff r fffffcff cfffff          |
@   ff  @@@ m        @@@@  c  c    rrmm fC  f rrrff          frffffffffffffffff          |
@m mff@@@ mm  rr Crp@@@@ rrr      Cmrrrmf ff  ffrr           frrffff fffffff         fff |
@@ p@@@@@  m   rrrr@@@@    rrrmm    m rf f ff  f rrr      c  ffrrf ffff        ffff      |
@@@@@@@@@@@C      p@@ p   fffrmmm   mmrr           rrr        f rrf    f                 |
@@@@@@@@@@      p@@@@    cfffrrr   m   rrrrmm  f c  fr        f  rr  c ff     f   f      |
@@@@@@@@@  p@@@@@@@@     mmf  crm  m  fmmmrmm   f    r        f  frr      f   c      fff |
@@@@@@@@p @@@@@@@@@     ffffmrrr mm  fmm cr  mm      rc        c f rr   ff         ffff  |
@@@@@@@@@@@@@@@ @@        fmmrmfff   ffm  r  fmfff   rrrr    f   f  rrf   f  f         c |
@@@@@@@@@@@@@@@ p   c      m rrfmf mm mfm r  mmmmfffffffrrrrr        rr         f        |
@@@@@@@@@@  f         f   fffmrfmrrrrrrfmmm mfmmmmmmmmmmmfffrr fff    rrr f  f           |
@@@@@@@@  cff        ff  c ffmrmmrfc  rfffffmmmmmmmfmmmmmmcffrrf        r           f    |
@@@@@@@@@@ffff       fmm  ffm rrrrfff rmmffffff    fm     mmmfr         r  c             |
@@@@@@@@@@@@   c    f m  ffmm  mmmmmmmrrcffff             m mfr c      rr        f  C    |
@@@@@@@@@@@@@p     rrrrr f     mmmmmmmmrrrmff    c         mmmrr      rr  f   c          |
@@@@@@@@@@@@@@rrrrrr   rr     mmmmmmmmmmmrrf         mmm  fmmffr    rrr     @            |
@@@@@@@@@@@@@@@      f cr f rrrfmmmmmmmm fr          fff  fmff rr  @r    @@@@@       fff |
@@@@@@@@@@@@@@@f   fmf  r  rrmmfffmmffm ffr c       mfffff m    r @@@@@r@@@@@       fff  |
@@@@@@@@@@@@@@@fff mmfmfrmrrrmmc ffffC@f fr          mffmfmmc rrr@@@@   ff r             |
@@@@@@@@@@@@@@@fcf fffffmrrmmm rrrrr  @@ffrrrmm  m    mmmmm  rr  @@@@@@ ff@@   cf  f  f  |
@@@@@@@@@@@@@@fffffm mfmrrfmmfffff rr @@@ mfrf       mmm    rrff@@@@@@ c@@@@@@     ff fff|
@@@@@@@@@@@@@mmff   ffmmrfmmmff@@fmmrr@@@  frrfc  m m      rr f@@@@@@@@@@@@@@@@@@22mmmmmm|
@@@@@@@@@@@@@mm    fcmmfrcmcm@@@@@mmmm c@@@  rr  mfff          @@@@@@@@@@@@@@@@@@  mmcmmm|
@@@@@@@@@@@@@@@mmmmmmmm@@@mp@@@@f@fffmm @@@@p rrrrr f        p@@@@@@@@@@@@@@@@@@@@@@@ mmm|
@@@@@@@@@@@@@@@@@@mmmmm@@@@@@@@ff@@fffmm@@@@@@  ffrrrr  c     @@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fp@@@fCfm  @@@@@@ fc frrrm    f@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@fc@@@@pfmm  @@@@@ f  m  rfffff @@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ mfm c @@@ mm fmmrrrrrr@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ c@@@@@@@cmm   @@ fff m m @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ f@@@@@@@@fmm @@@fmff f  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ f@@@@@@@@@fm @@@@f mm @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@pf@@@@@@@@@@m @@@@@ffmmff@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@m@@@@@@   mfff@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@c@fmrm@@@@@@@ f ff @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@p  mm@@@@@@@@@@r@@ c@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@@  p@@@@@d@@  c@@@@  c@@@@@@@@@@ffrr@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@@@  d  c         p@@@@@ @@@@@@@@@@ fc@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@@@@@@@@@@   dddddddddddd  @@@@@@@@@@@@@@@@@@@p@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@@@p@@@@@@  cdddmmmmmmmddddd @@dpd@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
@@@@@@@c         mmmmmmmmmmmmmmmdd c@@@@@@@@@@@@@@@@@@@@mpcm@@@@@@@@@mcp@@@@@@@@@@@@@@@@@|`
.replace(/\|/g, '').replace(/^\n/, '').replace(/\n$/, '')
  .split('\n');
  
function loadWWIIScenario() {
  // ============== map =================
  MAP_DATA = WWIITerrains.map((x, row) => (x.split('').map((v, col) => {
	  let o = parseInt(WWIIOwners[row][col]);
	  let slots = [];
    let terrain = '@';
	  if (v == 'c'){
      terrain = 'U';
      slots = Array(1).fill('F');
	  } else if (v == 'C') {
      terrain = 'U';
      slots = Array(25).fill('F');
    } else if (v == 'p' || v == 'm' || v == ' ' || v == 'f' || v == 'd' || v == 'r') {
      terrain = v.toUpperCase();
    }
    if (!TERRAINS[terrain]) throw 'Not found ' + v;
    return {terrain: terrain, owner: o, slots: slots, divisions: [], pt: pt(row, col)}
  })));
  
  window.PORTS = [];
  PLAYERS.forEach(x => delete x._mapDataFlattened);
  
  // ============== players =================
  
  PLAYERS[0].color = "rgba(140, 193, 226, 0.2)";
  PLAYERS[0].manpower = 5500000;
  PLAYERS[0].growthRate = 139187/47080000; // 0.0029563933
  PLAYERS[1].color = "rgba(96, 96, 96, 0.2)";
  PLAYERS[1].manpower = 3500000;
  // PLAYERS[1].growthRate = 482790/67349000; // 0.0071684806
  PLAYERS[1].growthRate = 0.003;
  
  PLAYERS[0].light = 1000;
  PLAYERS[0].heavy = 2000;
  PLAYERS[1].light = -100;
  PLAYERS[1].heavy = -100;
  
  PLAYERS[1].generals["Generalissimo"]["Chiang Kai-Shek"].selected=false;
  PLAYERS[1].generals["Generalissimo"]["Game Founder"].selected=true;
  PLAYERS[1].sumAllGeneralTraits;
  
  window.p3 = new Player();
  p3.color = 'rgba(150, 0, 0, 0.2)';
  p3.manpower = 10000000;
  p3.growthRate = 2012000/162039470; // 0.01241672785
  p3.light = -1200;
  p3.heavy = -600;
  p3.factoryInLight = 1;
  p3.sumAllGeneralTraits;
  
  // ============== military =================
  
  let british = new Template(12100, 18, 9, 'Division');
  let american = new Template(11600, 18, 8, 'US Infantry Division');
  let german = new Template(14300, 22, 10, 'Infanterie-Division', 11, 5);
  let italian = new Template(8900, 16, 6, 'Intalian Infantry Division', 8, 3);
  let germanPanzer = new Template(17800, 14, 32, 'Panzer Corps', 7, 16);
  let soviet = new Template(13100, 16, 10, 'Rifle Division');
  let sovietMilitia = new Template(9000, 9, 4, 'Militia Division', 0.1, 0.1);
  
  PLAYERS[0].savedTemplates = [british.deepClone(), american.deepClone()];
  PLAYERS[1].savedTemplates = [german.deepClone(), italian.deepClone(), germanPanzer.deepClone()];
  PLAYERS[2].savedTemplates = [soviet.deepClone(), sovietMilitia.deepClone()];
  
  let british_i = 0;
  let german_i = 0;
  let soviet_i = 0;
  
  MAP_DATA.forEach((x, row) => (x.forEach((v, col) => {
    if (v.terrain == '@') return;
    if (v.terrain == 'P')
      PORTS.push(pt(row, col));
    if (v.owner == 0) {
      let type = Math.random() < 0.7 ? british : american;
      if (v.terrain == 'P' || v.terrain == 'U')
        v.divisions = Array((Math.random() * 3).round() + 2).fill(0).map(() => (new Division(v.owner, ++british_i + 'th ' + type.defaultName, pt(row, col), type)));
    } else if (v.pt.adjacentNotToPlayer(v.pt.owner) > 0 || v.terrain == 'P' || v.terrain == 'U')
      if (v.owner == 1 && v.terrain != 'U') {
        let type = Math.random() < 0.9 ? (Math.random() < 0.8 ? german : italian) : germanPanzer;
        v.divisions = Array((Math.random() * 5).round() + 2).fill(0).map(() => (new Division(v.owner, ++german_i + 'th ' + type.defaultName, pt(row, col), type)));
      } else if (v.owner == 2) {
        let type = Math.random() < 0.3 ? soviet : sovietMilitia;
        v.divisions = Array((Math.random() * 3).round() + 1).fill(0).map(() => (new Division(v.owner, ++soviet_i + 'th ' + type.defaultName, pt(row, col), type)));
      }
  })));
  
  // ============= misc ==============
  window.timestamp = -900241200; // 6/22/1941
  window.timeIncrement = 518400 / 2; // 3 days
  
  reinitCanvas();
  updateInterfaceOnPass();
}
