import {omit} from 'lodash';

export const setInfo = (state, action) => {
  let toUpdate = Object.keys(omit(action,'type'));

  let updates={};
  let i;
  for (i=0; i < toUpdate.length; i++) {
    updates[toUpdate[i]] = action[toUpdate[i]];
  };
  return {
    ...state,
    ...updates
  };
};

const item = (state={}, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newItem;
      switch (action.itemType) {
        case 'characters':
          newItem = {xpAdjust: 0, gpAdjust: 0};
          break;
        case 'treasures':
          newItem = {valuePer: 0, treasureNum: 1, treasureClaimedBy: 'none'};
          break;
        case 'monsters':
          newItem = {cr: 0, numKilled: 0, numFled: 0, bonusMult: 1};
          break;
        case 'expenses':
          newItem = {valuePer: 0, expenseNum: 1, lmfExpense: false};
          break;
        case 'pois':
          newItem = {distanceFromWall: 1, poiType: 'poi'};
          break;
        default:
          newItem = {};
          break;
      }
      return setInfo(newItem, action);
    case 'SET_INFO':
      if (state.id !== action.id) {
        return state;
      }
      return setInfo(state, action);
    case 'ADJUST_POTIONS':
      const change = action.plusOrMinus==='plus' ? 1 : -1
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        expenseNum: state.expenseNum + change >= 0? state.expenseNum + change: 0,
      };
    default:
      return state;
  }
}

const items = (state=[], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        item(undefined, action)
      ];
    case 'DELETE_ITEM':
      if (action.itemType === 'expenses' && action.id < 2) {
        return state;
      }
      return state.filter(item => (item.id!==action.id));
    case 'SET_INFO':
      return state.map(i => item(i, action));
    case 'ADJUST_POTIONS':
      return state.map(i => item(i, action));
    default:
      return state;
  }
};

const data = (
  state={
    characters: [],
    treasures: [],
    monsters: [],
    expenses: [
      {
        itemType: 'expenses',
        expenseName: 'Potions (for low level chars)', 
        id: 0, 
        valuePer: 50, 
        expenseNum: 0, 
        lmfExpense: true
      },
      {
        itemType: 'expenses',
        expenseName: 'Potions', 
        id: 1, 
        valuePer: 50, 
        expenseNum: 0, 
        lmfExpense: false
      },
    ],
    pois: [],
  }, 
  action) => {
  if (action.type==='IMPORT_DATA') {
    return JSON.parse(action.toImport);
  }
  if (action.itemType) {
    let updates={};
    updates[action.itemType] = items(state[action.itemType], action);
    return {
      ...state,
      ...updates
    };
  }
  return state;
};

export default data;












