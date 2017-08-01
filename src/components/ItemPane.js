import React from 'react';

import {setSelectedToItem, setInfo} from '../actions';
import fieldTypes from '../definitions';
import InputFields from '../components/InputFields';
import ItemList from './ItemList';

//presentational
const ItemPane = ({
	selectedItem, 
	items, 
	itemType,
	onItemClick, 
	onInputFieldChange
}) => (
	<div className='itemPane'>
		<InputFields
			fields={fieldTypes[itemType]}
			selectedItem={selectedItem}
			onInputFieldChange={
				(selectedItem, input, fieldId) => {
				onInputFieldChange(selectedItem, input, fieldId)
			}}
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
	return (
		<ItemPane
			selectedItem= {state.selectedItem}
			items={state.data[itemType]}
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