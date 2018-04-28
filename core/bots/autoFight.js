Ai.autoFight = (player, divisions) => {
  divisions.forEach(div => {
    let location = div.loc;
    let prov = location.prov;

    if (div.skill < 1) {
      div.action = [];
      return;
    }
    if (div.adjacentNotToPlayer > 0) {
      div.action = [];
      location.adjacents(adj => {
        if (div.action.length) return;
        let divs = adj.prov.divisions;
        if (adj.owner != player && divs.length && divs[0].soft <= div.soft)
          div.action = [adj];
        else if (location.prov.terrain != 'U') {
          let leastNum = prov.divisions.length;
          let leastDst = location;
          location.adjacents(a => {
            if (a.owner == player && a.prov.divisions.length <= leastNum) {
              leastNum = a.prov.divisions.length;
              leastDst = a;
            }
          });
          if (leastDst != location) div.action = [leastDst];
          else div.action = [];
        }
      });
    }
  });
};
