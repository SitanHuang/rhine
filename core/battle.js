function antiAirEvadeChance(prov) {
  let aa = isNaN(prov) ? antiAirInProv(prov) : prov;
  return -1/(aa / 10 + 1) + 1;
}

function airStrike(div) {
  let chance = antiAirEvadeChance(div.prov);
  if (diplomacy_get(div.playerID, currentPlayerID).status != 'WAR') return;
  div.airStriked = true;
  if (Math.random() <= chance) return 0;
  let damage = (div.men * 0.2).max(800).round();
  div.men = (div.men - damage).round().min(0);
  let oe = div.entrench;
  div.entrench *= 0.7;
  div.morale *= 0.7;
  div.player.casualties += damage;
  div.movementProgress -= 1;

  if (div.prov.supply) div.prov.supply *= 0.7;

  return damage.round().min(0);
}

function airStrikeProv(prov) {
  let damages = 0;

  let divs = prov.divisions;
  if (diplomacy_get(prov.owner, currentPlayerID).status != 'WAR') return;

  prov.airStriked = true;

  divs.forEach(x => (damages += airStrike(x)));

  if (Math.random() < 0.05) {
    let facs = 0;
    prov.slots = prov.slots.filter(x => !(Math.random() > antiAirEvadeChance(prov) && (Math.random() <= (1 - facs / 5) ? ++facs : 0)));
    PLAYERS[prov.owner].constructionPoints += 100;
    if (facs)
      console.log(`${facs} buildings bombed ${currentPlayerID} -> ${prov.owner}`);
    return [damages, facs];
  }

  return [damages, 0];
}

function getCasualtyReductionFromSupport(div) {
  return ((div.template.support/div.template.manpower*1000).max(0.75) + Math.pow(div.template.hardness, 2) * 0.8).min(0).max(0.85);
}

function battle(d1, d2, attackingWidthPenalty, maxWidth) {
  // ter1 = TERRAINS[ter1];
  // ter2 = TERRAINS[ter2];

  let s1 = d1.softAttack * (1 - attackingWidthPenalty);
  let s2 = d2.softDefense;
  let h1 = d1.hardAttack * (1 - attackingWidthPenalty);
  let h2 = d2.hardDefense;
  let factor = 2.5 * 2;

  /*let as1 = (s1 - s2).min(0) + s1 * factor;
  let as2 = (s2 - s1).min(0) + s2 * factor;
  let ah1 = (h1 - h2).min(0) + h1 * factor;
  let ah2 = (h2 - h1).min(0) + h2 * factor;

  let _t1 = Math.sqrt(as1 + ah1);
  let _t2 = Math.sqrt(as2 + ah2);
  let t1 = (_t1 + ((_t1 - _t2) / 10)).min(0);
  let t2 = (_t2 + ((_t2 - _t1) / 10)).min(0);*/

  let as1 = s1 * factor * (1 - d2.hardness);
  let as2 = s2 * factor * (1 - d1.hardness);
  let ah1 = h1 * factor * (d2.hardness);
  let ah2 = h2 * factor * (d1.hardness);

  let _t1 = Math.sqrt(as1 + ah1);
  let _t2 = Math.sqrt(as2 + ah2);
  let t1 = _t1.min(0);
  let t2 = _t2.min(0);

  // if (Math.random() < d1.hardness) {
  //   t2 /= 4;
  // } else if (Math.random() < d2.hardness) {
  //   t1 /= 4;
  // }
  //
  let leastMorale = Math.min(d1.morale, d2.morale).min(0.05).max(0.7);

  let armored = d1.armored || d2.armored ? 1 : 0;
  let pierced = 0;
  let piercedBy = 0;

  if (d1.armor > d2.armor && d1.armored) {
    t2 /= 4; // attacking side gets additional 50%
    pierced = 1;
  }
  if (d2.armor > d1.armor && d2.armored) {
    t1 /= 2;
    piercedBy = 1;
  }

  let rt1 = ((t1 - t1 * (getCasualtyReductionFromSupport(d2) - getCasualtyReductionFromSupport(d1)).min(0)) * leastMorale).round();
  let rt2 = ((t2 - t2 * (getCasualtyReductionFromSupport(d1) - getCasualtyReductionFromSupport(d2)).min(0)) * leastMorale).round();

  rt1 = rt1.max(d2.men);
  rt2 = rt2.max(d1.men);
  d1.men = d1.men - rt2;
  d2.men = d2.men - rt1;
  d1.player.casualties += rt2;
  d2.player.casualties += rt1;

  let sum = t1 + t2;
  let difference = t1 - t2;
  d1.skill = (d1.skill + (difference / sum / 20).min(0.01)).max(4).round(2)
  d2.skill = (d2.skill + ((t2 - t1) / sum / 20).min(0.01)).max(4).round(2)

  d1.morale = (d1.morale + (difference / sum)).max(2).min(0.05).round(2)
  d2.morale = (d2.morale + ((t2 - t1) / sum)).max(2).min(0.05).round(2)


  sum = d1.morale + d2.morale;

  if (d2.hp <= 2 || d2.men <= 400) d2.remove();

  return {
    casualties: [rt2, rt1, sum],
    morales: [d1.morale, d2.morale],
    damage: [t1, t2],
    attackingWidthPenalty: attackingWidthPenalty,
    maxWidth: maxWidth,
    armored: armored,
    pierced: pierced,
    piercedBy: piercedBy,
    percentage: [d1.morale / sum.min(0.1), d2.morale / sum.min(0.1)]
  };
}

function combineBattleInfos(infos) {
  infos = infos.filter(x => x)
  let t = {
    casualties: [0, 0, 0],
    percentage: [0, 0],
    morales: [0, 0],
    armored: 0,
    attackingWidthPenalty: 0,
    pierced: 0,
    maxWidth: 0,
    piercedBy: 0,
    damage: [0, 0]
  };
  infos.forEach(info => {
    t.casualties[0] += info.casualties[0];
    t.casualties[1] += info.casualties[1];
    t.casualties[2] += info.casualties[2];
    t.percentage[0] += info.percentage[0];
    t.percentage[1] += info.percentage[1];
    t.morales[0] += info.morales[0];
    t.morales[1] += info.morales[1];
    t.damage[0] += info.damage[0];
    t.damage[1] += info.damage[1];
    t.armored += info.armored;
    t.maxWidth += info.maxWidth;
    t.pierced += info.pierced;
    t.piercedBy += info.piercedBy;
    t.attackingWidthPenalty += info.attackingWidthPenalty;
  });
  return {
    num: infos.length,
    casualties: t.casualties,
    damage: t.damage,
    maxWidth: t.maxWidth / infos.length,
    armored: t.armored.round(1),
    pierced: t.pierced.round(1),
    piercedBy: t.piercedBy.round(1),
    morales: [t.morales[0] / infos.length, t.morales[1] / infos.length],
    attackingWidthPenalty: (t.attackingWidthPenalty / infos.length * 100).round(),
    percentage: [
      t.percentage[0] / infos.length,
      t.percentage[1] / infos.length,
    ]
  };
}
