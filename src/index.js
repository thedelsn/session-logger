import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import sessionLoggerApp from './reducers';
import App from './components/App'

import populateInitialStore from './populateInitialStore'

//import {setSelectedToItem, setInputValuesToItem} from './actions'

/*
--------------
!!! REMEMBER THAT ITEM TYPES ARE PLURAL !!!
--------------
*/

const store = createStore(sessionLoggerApp);

const render = () => {
  //add this to provider for testing: {...store.getState()}
  ReactDOM.render(
    <Provider store={store} {...store.getState()}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};


populateInitialStore(store);

store.subscribe(render);
render();
