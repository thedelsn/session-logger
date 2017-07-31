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


import populateTestStore from './tests'

//import {setSelectedToItem, setInputValuesToItem} from './actions'

/*
--------------
!!! REMEMBER THAT ITEM TYPES ARE PLURAL !!!
--------------
*/

const store = createStore(sessionLoggerApp);

populateTestStore(store);


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
