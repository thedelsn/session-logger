import {combineReducers} from 'redux';
import data from './data';
import selectedItem from './selectedItem';
import importFieldInput from './importFieldInput';

const sessionLoggerApp = combineReducers({
  data,
  selectedItem,
  importFieldInput,
});

export default sessionLoggerApp;