import {omit} from 'underscore';

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
					newItem = {valuePer: 0, treasureNum: 1};
					break;
				case 'monsters':
					newItem = {cr: 0, numKilled: 0, numFled: 0, bonusMult: 1};
					break;
				default:
					newItem = {};
					break;
			}
			return setInfo(newItem, action);
		case 'SET_INFO':
			if (state.id !== action.id)	{
				return state;
			}
			return setInfo(state, action);
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
			return state.filter(item => (item.id!==action.id));
		case 'SET_INFO':
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
	}, 
	action) => {
	if (action.itemType) {
		let newState = state;
		newState[action.itemType] = items(state[action.itemType], action);
		return newState;
	}
	return state;
};

export default data;












