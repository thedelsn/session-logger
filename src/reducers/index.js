import {combineReducers} from 'redux';
import data from './data';
import selectedItem from './selectedItem';
import visiblePane from './visiblePane';

const sessionLoggerApp = combineReducers({
	data,
	selectedItem,
	visiblePane
});

export default sessionLoggerApp;