import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import sessionLoggerApp from './reducers';
//import InputFieldsPane from './components/InputFieldsPane';
//import fieldTypes from './definitions';
//import AddItem from './components/AddItem';
//import DeleteItem from './components/DeleteItem';
import LogOutput from './components/LogOutput'
import Header from './components/Header';
import DisplayItemPane from './components/ItemPane';

import {addItem} from './actions'

//import {setSelectedToItem, setInputValuesToItem} from './actions'

/*
--------------
!!! REMEMBER THAT ITEM TYPES ARE PLURAL !!!
--------------
*/

const store = createStore(sessionLoggerApp);

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
	claimedBy: '-1',
})
store.dispatch(addItem('treasures'));
store.dispatch({
	type: 'SET_INFO',
	itemType: 'treasures',
	id: 1,
	treasureName: 'Pearl of Power',
	valuePer: '1000',
	isMagicItem: true,
	claimedBy: 0,
	treasureDescription: 'Use an action to regain a spell slot once/day.'
});
store.dispatch(addItem('monsters'));
store.dispatch({
	type: 'SET_INFO',
	itemType: 'monsters',
	id: 0,
	monsterName: 'Skeleton',
	cr: '1/4',
	numKilled: '12',
	numFled: '4'
});


store.dispatch({
	type: 'SET_SELECTED_ITEM',
	itemType: 'characters',
	id: 0,
	charName: 'Sovan',
	charLevel: 5,
	charClass: 'bard',
	isDonating: true,
})


const SessionLoggerApp = () => {
	const state = store.getState();
	return (
		<div>
			<Header />
			<DisplayItemPane
				itemType={state.visiblePane}
				itemLabel='Item'
				state={state}
				dispatch={(action) => {store.dispatch(action)}}
			/>
			<LogOutput
				state={state}
			/>
		</div>
	);
}

const render = () => {
	ReactDOM.render(
		<Provider store={store} {...store.getState()}>
			<SessionLoggerApp />
		</Provider>,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();
