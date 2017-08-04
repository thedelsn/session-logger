import {addItem} from './actions'

const populateTestStore = (store) => {
  store.dispatch(addItem('characters'));
  store.dispatch({
    type: 'SET_INFO',
    itemType: 'characters',
    id: 0,
    charName: 'Sovan',
    charLevel: 5,
    charClass: 'bard',
    isDonating: true,
    charChanges: 'lost 2 points of Wis'
  });
  store.dispatch(addItem('characters'));
  store.dispatch({
    type: 'SET_INFO',
    itemType: 'characters',
    id: 1,
    charName: 'Silverleaf',
    charLevel: 4,
    charClass: 'druid'
  });
  store.dispatch(addItem('characters'));
  store.dispatch({
    type: 'SET_INFO',
    itemType: 'characters',
    id: 2,
    charName: 'Marc',
    charLevel: 3,
    charClass: 'sorcerer',
    charChanges: 'leveled to 4!',
    isDonating: true,
  });
  store.dispatch(addItem('treasures'));
  store.dispatch({
    type: 'SET_INFO',
    itemType: 'treasures',
    id: 0,
    treasureName: 'Sword',
    valuePer: 10,
    treasureNum: 3,
    treasureClaimedBy: -1,
  })
  store.dispatch(addItem('treasures'));
  store.dispatch({
    type: 'SET_INFO',
    itemType: 'treasures',
    id: 1,
    treasureName: 'Pearl of Power',
    valuePer: 1000,
    isMagicItem: true,
    treasureClaimedBy: 0,
    treasureDescription: 'Use an action to regain a spell slot once/day.'
  });
  store.dispatch(addItem('monsters'));
  store.dispatch({
    type: 'SET_INFO',
    itemType: 'monsters',
    id: 0,
    monsterName: 'Skeleton',
    cr: '1/4',
    numKilled: 12,
    numFled: 4,
  });

}

export default populateTestStore;