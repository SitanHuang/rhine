window.ChineseGenerals = {
  Generalissimo: {
    'Chiang Kai-Shek': {
      desc: 'President, Republic Of China',
      path: 'scenario/ChineseGenerals/GeneralissimoChiangKaiShek.jpg',
      mod: {
        o: 1.1,
        b: 1.1,
        s: 1,
        e: 1.1
      },
      selected: true
    },
    'Game Founder': {
      desc: 'Programmer',
      path: 'scenario/ChineseGenerals/GeneralissimoSitanHuang.jpg',
      mod: {
        o: 0.9,
        b: 1.3,
        s: 1.2,
        e: 0.9
      }
    }
  },
  'Field Marshal': {
    'Hu Zong-Nan': {
      desc: 'Eagle of the Northwest',
      path: 'scenario/ChineseGenerals/FieldMarshalHuZongNan.jpg',
      mod: {
        o: 1.2,
        b: 0.9,
        s: 0.8,
        e: 1.2
      },
      selected: true
    },
    'Li Zong-ren': {
      desc: 'Vice President, Republic Of China',
      path: 'scenario/ChineseGenerals/FieldMarshalLiZongRen.jpg',
      mod: {
        o: 1,
        b: 1.3,
        s: 1,
        e: 1
      },
      selected: true
    },
    'Gao Zhi-hang': {
      desc: 'Modern Warfare Expert',
      mod: {
        o: 1.2,
        b: 1,
        s: 1.1,
        e: 0.9
      },
      path: 'scenario/ChineseGenerals/FieldMarshalGaoZhihang.jpg',
      selected: true
    },
    'Zhu De': {
      desc: 'Pioneers of Liberation',
      mod: {
        o: 1.2,
        b: 1.2,
        s: 0.9,
        e: 0.8
      },
      path: 'scenario/ChineseGenerals/FieldMarshalZhuDe.jpg'
    },
    'Xiao Yi-Su': {
      desc: 'Minister of National Defense, Republic Of China',
      mod: {
        o: 1,
        b: 0.8,
        s: 0.7,
        e: 1.3
      },
      path: 'scenario/ChineseGenerals/FieldMarshalXiaoYiSu.jpg'
    }
  }
}

PLAYERS.forEach(x => {x.generals = JSON.parse(JSON.stringify(window.ChineseGenerals)); x.sumAllGeneralTraits;})
