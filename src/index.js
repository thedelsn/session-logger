import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import sessionLoggerApp from './reducers';
import App from './components/App'

//import populateInitialStore from './populateInitialStore'

//import {setSelectedToItem, setInputValuesToItem} from './actions'

/*
--------------
!!! REMEMBER THAT ITEM TYPES ARE PLURAL !!!
--------------
*/

//const store = createStore(sessionLoggerApp);
const store = createStore(
   sessionLoggerApp, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

const render = () => {
  //add this to provider for testing: {...store.getState()}
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

/*store.dispatch({
  type: 'IMPORT_DATA',
  toImport: `{"characters":[{"xpAdjust":0,"gpAdjust":0,"itemType":"characters","id":0,"charName":"Ezra","charClass":"Paladin","charLevel":4,"isDonating":false,"charChanges":"gains Winter Wolf blessing: his cold breath does an extra d8 of damage, and uses Cha instead of Con for the save DC"},{"xpAdjust":0,"gpAdjust":0,"itemType":"characters","id":1,"charName":"Pierre","charLevel":4,"charClass":"Cleric","isDonating":false},{"xpAdjust":0,"gpAdjust":476,"itemType":"characters","id":2,"charName":"Sovan","charLevel":5,"charClass":"Bard","isDonating":false,"charChanges":"gains Winter Wolf blessing: Vicious Mockery also slows enemies by 10' (like Ray of Frost)"},{"xpAdjust":0,"gpAdjust":0,"itemType":"characters","id":3,"charName":"Ent","charLevel":2,"charClass":"Ranger","isDonating":false},{"xpAdjust":0,"gpAdjust":476,"itemType":"characters","id":5,"charName":"JP","charLevel":5,"charClass":"Cleric","isDonating":false,"charChanges":"gains Winter Wolf blessing: can project Shield spells onto other people 1/expedition"},{"xpAdjust":0,"gpAdjust":0,"itemType":"characters","id":6,"charName":"Kalandria","charLevel":1,"charClass":"Sorcerer"}],"treasures":[{"valuePer":60,"treasureNum":1,"treasureClaimedBy":null,"itemType":"treasures","id":3,"treasureName":"Silver Bracelt","treasureDescription":"From the BB"},{"valuePer":600,"treasureNum":1,"treasureClaimedBy":3,"itemType":"treasures","id":4,"treasureName":"Exhausting Longbow","isMagicItem":true,"treasureDescription":"1/day use action to spend a hit die to give +1 for a minute"},{"valuePer":230,"treasureNum":1,"treasureClaimedBy":"none","itemType":"treasures","id":5,"treasureName":"Precious ores","treasureDescription":"from the grosQua"},{"valuePer":100,"treasureNum":2,"treasureClaimedBy":"none","itemType":"treasures","id":8,"treasureName":"Demon ichor"}],"monsters":[{"cr":"1","numKilled":5,"numFled":0,"bonusMult":1,"itemType":"monsters","id":2,"monsterName":"Ghouls"},{"cr":"4","numKilled":1,"numFled":0,"bonusMult":1,"itemType":"monsters","id":4,"monsterName":"Flame skull (regional power but we already got 1/4 xp for it so we only get 1/4 xp this time)"},{"cr":"1/4","numKilled":12,"numFled":0,"bonusMult":1,"itemType":"monsters","id":5,"monsterName":"Killer birds"},{"cr":"1/4","numKilled":17,"numFled":0,"bonusMult":1,"itemType":"monsters","id":6,"monsterName":"Zombies"},{"cr":"1/2","numKilled":0,"numFled":10,"bonusMult":1,"itemType":"monsters","id":7,"monsterName":"GrosQua"},{"cr":"2","numKilled":0,"numFled":1,"bonusMult":1,"itemType":"monsters","id":8,"monsterName":"Better GrosQua"},{"cr":"3","numKilled":1,"numFled":0,"bonusMult":1,"itemType":"monsters","id":9,"monsterName":"Earthbender GrosQua"},{"cr":"4","numKilled":1,"numFled":0,"bonusMult":1,"itemType":"monsters","id":10,"monsterName":"Winter Wolf"},{"cr":"6","numKilled":0,"numFled":1,"bonusMult":1,"itemType":"monsters","id":11,"monsterName":"Vrock (actually killed)"}],"expenses":[{"itemType":"expenses","expenseName":"Potions (for low level chars)","id":0,"valuePer":50,"expenseNum":0,"lmfExpense":true},{"itemType":"expenses","expenseName":"Potions","id":1,"valuePer":50,"expenseNum":18,"lmfExpense":false},{"valuePer":0.5,"expenseNum":27,"lmfExpense":false,"itemType":"expenses","id":2,"expenseName":"Rations"},{"valuePer":5,"expenseNum":2,"lmfExpense":false,"itemType":"expenses","id":3,"expenseName":"Ritual Components"},{"valuePer":150,"expenseNum":5,"lmfExpense":false,"itemType":"expenses","id":4,"expenseName":"Horse","expenseDescription":"3 killed by ghouls, 2 fell down a hole"},{"valuePer":30,"expenseNum":1,"lmfExpense":false,"itemType":"expenses","id":7,"expenseName":"Door","expenseDescription":"made by JP for dug out tunnel"},{"valuePer":25,"expenseNum":3,"lmfExpense":false,"itemType":"expenses","id":8,"expenseName":"Holy water x3","expenseDescription":"for the Abyssal Guard"},{"valuePer":375,"expenseNum":1,"lmfExpense":false,"itemType":"expenses","id":9,"expenseName":"cancel out diplomacy POI gold"},{"valuePer":696,"expenseNum":1,"lmfExpense":false,"itemType":"expenses","id":10,"expenseName":"Horse gear","expenseDescription":""}],"pois":[{"distanceFromWall":3,"poiType":"hex","itemType":"pois","id":1,"hexNumber":"6.11"},{"distanceFromWall":4,"poiType":"hex","itemType":"pois","id":2,"hexNumber":"7.10"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":3,"poiName":"Centipede camp","hexNumber":"6.11"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":4,"poiName":"Hob Camp","hexNumber":"5.12"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":5,"poiName":"Hob Fortress","hexNumber":"6.11"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":6,"poiName":"Ant nest","hexNumber":"6.11"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":7,"poiName":"GrosQua Fort","poiDescription":"","hexNumber":"6.11"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":8,"poiName":"Centipede camp","hexNumber":"7.10"},{"distanceFromWall":4,"poiType":"poi","itemType":"pois","id":9,"poiName":"GrosQua Fort","hexNumber":"7.10"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":10,"poiName":"Earthenworks and GrosQua fort","hexNumber":"7.11","poiDescription":"w ballistae and a massive siege weapon sized slingshot"},{"distanceFromWall":3,"poiType":"poi","itemType":"pois","id":11,"poiName":"BB","poiDescription":"diplomacy"},{"distanceFromWall":1,"poiType":"mpoi","itemType":"pois","id":12,"poiName":"Crested Skull","poiDescription":"diplomacy"},{"distanceFromWall":4,"poiType":"poi","itemType":"pois","id":13,"poiName":"GrosQua","poiDescription":"diplomacy"}],"details":{"id":0,"date":"August 5, 2017","daysOut":5,"adjustRations":0,"itemType":"details"}}`
});*/
//populateInitialStore(store);

store.subscribe(render);
render();
