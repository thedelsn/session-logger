import React from 'react';

import {setSelectedToItem, setInfo} from '../actions';
import fieldTypes from '../definitions';
import InputFields from '../components/InputFields';
import ItemList from './ItemList';

//presentational
const ItemPane = ({
	selectedItem, 
	toSelectOnDelete,
	items, 
	itemType, 
	itemLabel, 
	onItemClick, 
	onInputFieldChange
}) => (
	<div className='itemPane'>
		<InputFields
			className= 'inputFields'
			fields={fieldTypes[itemType]}
			selectedItem={selectedItem}
			onInputFieldChange={
				(selectedItem, input, fieldId) => {
				onInputFieldChange(selectedItem, input, fieldId)
			}}
			toSelectOnDelete={toSelectOnDelete}
		/>
		<ItemList
			items={items}
			onItemClick={(item) => {
				onItemClick(item)
			}}
			selectedItem={selectedItem}
		/>
	</div>
);

const DisplayItemPane = ({
	itemType,
	itemLabel,
	state,
	dispatch
}) => {
	const items = state.data[itemType];
	return (
		<ItemPane
			selectedItem= {state.selectedItem}
			items={items}
			itemType={itemType}
			itemLabel={itemLabel}
			onItemClick={(item) => {
				dispatch(setSelectedToItem(item));
				//setInputValuesToItem(item);
			}}
			onInputFieldChange={(
				input, 
				fieldId, 
				selectedItem
			) => {
				dispatch(
					setInfo(selectedItem, fieldId, input)
				);
			}}
		/>
	);
}


export default DisplayItemPane;