export const xpTable = {
  '0': 0,
  '1/8': 50,
  '1/4': 100,
  '1/2': 200,
  '1': 400,
  '2': 600,
  '3': 800,
  '4': 1200,
  '5': 1600,
  '6': 2400,
  '7': 3200,
  '8': 4800,
  '9': 6400,
  '10': 9600,
};

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
		//claimedBy needs to be implemented separately
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
		//bonusMult needs to be implemented separately
	]
}

export default fieldTypes;