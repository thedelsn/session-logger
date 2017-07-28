import React from 'react';

import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import {setSelectedToItem, setInputValuesToItem, setInfo} from '../actions';
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
	<div>
		<AddItem
			itemType={itemType}
			toFocusId={fieldTypes[itemType][0].id}
		> Add {itemLabel} </AddItem>
		<DeleteItem 
			selectedItem={selectedItem}
			toSelect={toSelectOnDelete}
		> Delete {itemLabel} </DeleteItem>
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
	const items = state.data[itemType];
	return (
		<ItemPane
			selectedItem= {state.selectedItem}
			//this is -2 because I want the end of the
			//array (-1) after something has been deleted (-1)
			toSelectOnDelete= {
				items[items.length -2] || 
				{itemType: itemType}
			}
			items={items}
			itemType={itemType}
			itemLabel={itemLabel}
			onItemClick={(item) => {
				dispatch(setSelectedToItem(item));
				setInputValuesToItem(item);
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