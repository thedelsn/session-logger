import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import sessionLoggerApp from './reducers';
import LogOutput from './components/LogOutput'
import Header from './components/Header';
import ItemPane from './components/ItemPane';
import ExportPane from './components/ImportExportPane';

import populateInitialStore from './populateInitialStore'

//import {setSelectedToItem, setInputValuesToItem} from './actions'

/*
--------------
!!! REMEMBER THAT ITEM TYPES ARE PLURAL !!!
--------------
*/

const store = createStore(sessionLoggerApp);

const SessionLoggerApp = () => {
  const state = store.getState();
  return (
    <div>
      <div className='test'>
      <Header />
      
      <ItemPane
        itemType={state.selectedItem.itemType}
        itemLabel='Item'
        state={state}
        dispatch={(action) => {store.dispatch(action)}}
      />
      </div>
      <LogOutput
        state={state}
      />
      <ExportPane />
    </div>
  );
}

const render = () => {
  //add this to provider for testing {...store.getState()}
  ReactDOM.render(
    <Provider store={store} {...store.getState()}>
      <SessionLoggerApp />
    </Provider>,
    document.getElementById('root')
  );
};


populateInitialStore(store);

store.subscribe(render);
render();
