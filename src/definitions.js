export const xpTable = {
  '0': 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
};

export const months = {
  '0': 'January',
  '1': 'February',
  '2': 'March',
  '3': 'April',
  '4': 'May',
  '5': 'June',
  '6': 'July',
  '7': 'August',
  '8': 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December'
}

export const fieldTypes = {
  characters: [
    {
      id: 'charName',
      itemType: 'characters',
      display: 'Name',
      type: 'text'
    },
    {
      id: 'charLevel',
      itemType: 'characters',
      display: 'Level',
      type: 'number'
    },
    {
      id: 'charClass',
      itemType: 'characters',
      display: 'Class',
      type: 'text'
    },
    {
      id: 'charChanges',
      itemType: 'characters',
      display: 'Changes',
      type: 'text'
    },
    {
      id: 'xpAdjust',
      itemType: 'characters',
      display: 'Adjust XP',
      type: 'number'
    },
    {
      id: 'gpAdjust',
      itemType: 'characters',
      display: 'Adjust GP',
      type: 'number'
    },
    {
      id: 'isDonating',
      itemType: 'characters',
      display: 'Donating?',
      type: 'checkbox'
    },
  ],
  treasures: [
    {
      id: 'treasureName',
      itemType: 'treasures',
      display: 'Name',
      type: 'text'
    },
    {
      id: 'treasureDescription',
      itemType: 'treasures',
      display: 'Description',
      type: 'text'
    },
    {
      id: 'valuePer',
      itemType: 'treasures',
      display: 'Value per Item',
      type: 'number'
    },
    {
      id: 'treasureNum',
      itemType: 'treasures',
      display: 'Number',
      type: 'number'
    },
    {
      id: 'isMagicItem',
      itemType: 'treasures',
      display: 'Magic Item?',
      type: 'checkbox'
    }
    //treasureClaimedBy is implemented separately
  ],
  monsters: [
    {
      id: 'monsterName',
      itemType: 'monsters',
      display: 'Name',
      type: 'text'
    },
    {
      id: 'cr',
      itemType: 'monsters',
      display: 'CR',
      type: 'text'
    },
    {
      id: 'numKilled',
      itemType: 'monsters',
      display: '# Killed',
      type: 'number'
    },
    {
      id: 'numFled',
      itemType: 'monsters',
      display: '# Fled',
      type: 'number'
    },
    //bonusMult is implemented separately
  ],
  expenses: [
    {
      id: 'expenseName',
      itemType: 'expenses',
      display: 'Name',
      type: 'text'
    },
    {
      id: 'expenseDescription',
      itemType: 'expenses',
      display: 'Description',
      type: 'text'
    },
    {
      id: 'valuePer',
      itemType: 'expenses',
      display: 'Value Per',
      type: 'number'
    },
    {
      id: 'expenseNum',
      itemType: 'expenses',
      display: 'Number',
      type: 'number'
    },
    {
      id: 'lmfExpense',
      itemType: 'expenses',
      display: 'LMF Expense?',
      type: 'checkbox'
    },
  ],
  pois: [
    {
      id: 'poiName',
      itemType: 'pois',
      display: 'Name',
      type: 'text',
    },
    {
      id: 'poiDescription',
      itemType: 'pois',
      display: 'Description',
      type: 'text',
    },
    {
      id: 'hexNumber',
      itemType: 'pois',
      display: 'Hex Number',
      type: 'text',
    },
    {
      id: 'distanceFromWall',
      itemType: 'pois',
      display: 'Hexes from Wall',
      type: 'number',
    },
    //poiType is implemented separately
  ],
}

export default fieldTypes;