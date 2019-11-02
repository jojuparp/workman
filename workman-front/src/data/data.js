
export const users = [

  {
    username: 'jojuparp',
    name: 'Joni Parpala',
    id: 1,

  },

  {
    username: 'vesal',
    name: 'Vesa Lappilainen',
    id: 2,

  },

  {
    username: 'eeppi',
    name: 'Esko Jooseppi',
    id: 3,

  }
]

export const works = [

  {
    type: 'asennustehtävä',
    importance: 2,
    address: 'rantaraitti 1',
    allocated: true,
    description: 'putki pitää asentaa',
    completed: true,
    startDate: Date,
    endDate: Date,
    time: null,
    id: 1
  },

  {
    type: 'tarkistuskäynti',
    importance: 3,
    address: 'rantaraitti 1',
    description: 'putki pitää asentaa',
    completed: false,
    allocated: true,
    startDate: Date,
    endDate: Date,
    time: null,
    id: 2
  },

  {
    type: 'korjaustehtävä',
    importance: 1,
    address: 'rantaraitti 1',
    description: 'putki pitää asentaa',
    completed: true,
    allocated: false,
    startDate: Date,
    endDate: Date,
    time: null,
    id: 3
  },

]