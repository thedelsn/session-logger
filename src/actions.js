let nextId = {
  characters: 0,
  treasures: 0,
  monsters: 0,
  expenses: 2,
  pois: 0,
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

export const adjustPotions = (expenseId, plusOrMinus) => ({
  type: 'ADJUST_POTIONS',
  itemType: 'expenses',
  id: expenseId,
  plusOrMinus,
});

export const setSelectedItemInfo = (fieldId, input) => ({
  type: 'SET_SELECTED_INFO',
  [fieldId]: input
});

export const setSelectedToItem = item => ({
  type: 'SET_SELECTED_ITEM',
  ...item
});