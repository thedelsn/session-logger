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


import populateInitialStore from './populateInitialStore'

//import {setSelectedToItem, setInputValuesToItem} from './actions'

/*
--------------
!!! REMEMBER THAT ITEM TYPES ARE PLURAL !!!
--------------
*/

const store = createStore(sessionLoggerApp);

populateInitialStore(store);

const SessionLoggerApp = () => {
  const state = store.getState();
  return (
    <div>
      <div className='test'>
      <Header />
      
      <DisplayItemPane
        itemType={state.visiblePane}
        itemLabel='Item'
        state={state}
        dispatch={(action) => {store.dispatch(action)}}
      />
      </div>
      <LogOutput
        state={state}
      />
    </div>
  );
}

const render = () => {
  //TODO: remove spread over store once I'm done testing!!
  ReactDOM.render(
    <Provider store={store} {...store.getState()}>
      <SessionLoggerApp />
    </Provider>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
