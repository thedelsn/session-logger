import {setInfo} from './data';

const selectedItem = (state={id: 0, itemType: 'null'}, action) => {
	switch (action.type)	{
		case 'SET_SELECTED_ITEM':
			return setInfo({id: 0, itemType: 'null'}, action);
		default:
			return state;
	}
};

export default selectedItem;