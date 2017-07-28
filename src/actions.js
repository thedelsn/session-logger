import {fieldTypes} from './definitions'


let nextId = {
	characters: 0,
	treasures: 0,
	monsters: 0,
};
export const addItem = (itemType) => ({
	type: 'ADD_ITEM',
	itemType: itemType,
	id: nextId[itemType]++
});

export const deleteItem = item => ({
	type: 'DELETE_ITEM',
	itemType: item.itemType,
	id: item.id
});

export const setInfo = (selectedItem, fieldId, input) => ({
	type: 'SET_INFO',
	itemType: selectedItem.itemType,
	id: selectedItem.id,
	[fieldId]: input
});

export const setSelectedToItem = item => ({
	type: 'SET_SELECTED_ITEM',
	...item
})

export const setInputValuesToItem = item => {
	const fields = fieldTypes[item.itemType];
	fields.forEach(fieldType => {
		const field = document.getElementById(fieldType.id);
		if (field) {
			field.value = item[fieldType.id] || '';
			field.checked = item[fieldType.id] || false;
		}
	});
	const claimedByField =document.getElementById('claimedBy') 
	if (claimedByField) {
		claimedByField.value = item.claimedBy;
	}
}

export const setVisiblePane = (visiblePane) => ({
	type: 'SET_VISIBLE_PANE',
	visiblePane
});