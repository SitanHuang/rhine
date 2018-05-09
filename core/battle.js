function airStrike(div) {
  let damage = (div.men * 0.2).max(1000).round();
  div.men = (div.men - damage).round().min(0);
  div.airStriked = true;
  div.player.casualties += damage;
  return damage.round().min(0);
}

function airStrikeProv(divs) {
  let damages = 0;
  divs.forEach(x => (damages += airStrike(x)))
  return damages;
}

function battle(d1, d2, d1m) {
  let s1 = d1.soft;
  let s2 = d2.soft;
  let h1 = d1.hard;
  let h2 = d2.hard;
  let factor = 4;

  let as1 = (s1 - s2).min(0) + s1 * factor;
  let as2 = (s2 - s1).min(0) + s2 * factor;
  let ah1 = (h1 - h2).min(0) + h1 * factor;
  let ah2 = (h2 - h1).min(0) + h2 * factor;

  let _t1 = Math.sqrt(as1 + ah1);
  let _t2 = Math.sqrt(as2 + ah2);
  let t1 = (_t1 + ((_t1 - _t2) / 3)).min(0);
  let t2 = (_t2 + ((_t1 - _t2) / 3)).min(0);

  if (Math.random() < d1.breakThrough) {
    t2 = 50;
  } else if (Math.random() < d2.breakThrough) {
    t1 = 50;
  }

  let rt1 = t1.round();
  let rt2 = t2.round();

  d1.men = (d1.men - rt2).min(0);
  d2.men = (d2.men - rt1).min(0);
  d1.player.casualties += rt2;
  d2.player.casualties += rt1;

  let sum = t1 + t2;
  let difference = t1 - t2;
  d1.skill = (d1.skill + (difference / sum / 20).min(0.01)).max(4).round(2)
  d2.skill = (d2.skill + ((t2 - t1) / sum / 20).min(0.01)).max(4).round(2)

  sum = d1.hp / d2.hp + d2.hp / d1.hp;

  if (d2.hp <= 2) d2.remove();

  return {
    casualties: [t2, t1, sum],
    percentage: [d1.hp / d2.hp.min(1) / sum, d2.hp / d1.hp.min(1) / sum]
  };
}

function combineBattleInfos(infos) {
  infos = infos.filter(x => x)
  let t = {
    casualties: [0, 0, 0],
    percentage: [0, 0]
  };
  infos.forEach(info => {
    t.casualties[0] += info.casualties[0];
    t.casualties[1] += info.casualties[1];
    t.casualties[2] += info.casualties[2];
    t.percentage[0] += info.percentage[0];
    t.percentage[1] += info.percentage[1];
  });
  return {
    casualties: t.casualties,
    percentage: [
      t.percentage[0] / infos.length,
      t.percentage[1] / infos.length,
    ]
  };
}
