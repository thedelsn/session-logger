import {addItem, setSelectedToItem, setInfo} from './actions';

const populateInitialStore = (store) => {
	store.dispatch(addItem('characters'));
	store.dispatch(addItem('monsters'));
	store.dispatch(addItem('treasures'));
	store.dispatch(addItem('expenses'));
	store.dispatch(addItem('pois'));
	store.dispatch(setInfo({id:0, itemType: 'details'}, 'daysOut', 5))
	store.dispatch({
		type: 'SET_INFO',
		itemType: 'expenses',
		id: 2,
		expenseName: 'Rations',
		valuePer: 0.5,
		expenseNum: 0,
	});
	store.dispatch(setSelectedToItem({
		id: 0,
		itemType: 'characters',
		gpAdjust: 0,
		xpAdjust: 0,
	}));
}

export default populateInitialStore