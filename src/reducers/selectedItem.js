import {setInfo} from './data';

const selectedItem = (state={id: -1, itemType: 'characters'}, action) => {
  switch (action.type)  {
    case 'SET_SELECTED_ITEM':
      return setInfo({id: 0, itemType: 'characters'}, action);
    case 'SET_SELECTED_INFO':
      return setInfo(state, action);
    default:
      return state;
  }
};

export default selectedItem;