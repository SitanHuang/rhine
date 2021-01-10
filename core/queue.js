function new_queue(tem) {
  let nl = tem.support + tem.light;
  let nh = tem.motorized + tem.heavy;
  return {
    tem: tem.deepClone(),
    l: 0,
    h: 0,
    nl: nl,
    nh: nh,
    nt: tem.troop,
    t: 0
  }
}

function queue_deployable(i) {
  let q = currentPlayer.queue[i];
  return q.l == q.nl && q.h == q.nh;
}

function queue_info() {
  let ql = currentPlayer.queue;
  let t = {l: 0, h: 0, nl: 0, nh: 0, d: ql.length, t: 0, nt: 0};
  ql.forEach(q => {
    t.l += q.l;
    t.h += q.h;
    t.nl += q.nl;
    t.nh += q.nh;
    t.t += q.t;
    t.nt += q.nt;
  });
  let ph = (currentPlayer._heavyProductionPerTurn * (1 - currentPlayer.percentReserved / 100)).ceil();
  let pl = (currentPlayer._lightProductionPerTurn * (1 - currentPlayer.percentReserved / 100)).ceil();
  let totalTurns = Math.max((t.nh - t.h) / ph, (t.nl - t.l) / pl).ceil();
  let duration = timeIncrement * totalTurns;
  t.duration = duration;
  t.delivery = duration + timestamp;
  t.recLightFactory = ((t.nl - t.l) / ((t.nh - t.h) / HEAVY_EQUIPMENT_COEF + (t.nl - t.l)) * currentPlayer.factories).min(1).max(currentPlayer.factories).round() || currentPlayer.factories;
  return t;
}

function fill_queue(n, amnt) {
  n = n == '_light' ? 'l' : 'h';
  let nn = 'n' + n;
  let ql = currentPlayer.queue;
  while (amnt > 0) {
    for (let i = 0;i < ql.length;i++) {
      let q = ql[i];
      if (amnt <= 0) break;
      if(q[n] >= q[nn]) continue;
      if (q.tem.troop - q.t > 1000) {
        let menD = q.tem.troop - q.t;
        menD = (Math.min(Math.sqrt(menD * 50), currentPlayer.recruitable / 500) / 2).round();
        q.t += menD;
        currentPlayer.manpower -= menD;
      }
      q[n]++;
      amnt--;
    }
  }
}

function add_queue(q) {
  if (Math.min(currentPlayer.light, currentPlayer.heavy) < 0) return false;
  currentPlayer.queue.push(q);
}

function deploy_all_queue() {
  if (!currentPlayer.queueDist) return false;
  let ql = currentPlayer.queue;
  for (let i = 0;i < ql.length;i++) {
    let q = ql[i];
    if (queue_deployable(i)) {
      q.tem.deploy(currentPlayer, currentPlayer.queueDist, q.tem.defaultName, q);
      ql.splice(i--, 1);
    }
  }
  return true;
}
function deploy_queue(i) {
  if (!queue_deployable(i) || !currentPlayer.queueDist) return false;
  let ql = currentPlayer.queue;
  let q = ql.splice(i, 1)[0];

  q.tem.deploy(currentPlayer, currentPlayer.queueDist, q.tem.defaultName, q);

  return true;
}

function del_queue(i) {
  let ql = currentPlayer.queue;
  let q = ql.splice(i, 1)[0];
  currentPlayer.light += q.l; // uses abstract setter to distribute equipment
  currentPlayer.heavy += q.h;
  currentPlayer.manpower += q.t;
}

function clear_queue() {
  let ql = currentPlayer.queue;
  let i = queue_info();
  currentPlayer.light += i.l; // uses abstract setter to distribute equipment
  currentPlayer.heavy += i.h;
  currentPlayer.manpower += i.t;
  ql.splice(0, ql.length);
}
