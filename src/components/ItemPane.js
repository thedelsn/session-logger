import React from 'react';
import {connect} from 'react-redux';

import {setSelectedToItem, setInfo} from '../actions';
import fieldTypes from '../definitions';
import InputFields from './inputPane/InputFields';
import ItemList from './ItemList';

const ItemPane = ({
  selectedItem, 
  items,
  itemType,
  numCharacters,
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
      numCharacters={numCharacters}
      selectedItem={selectedItem}
    />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  selectedItem: state.selectedItem,
  items: state.data[ownProps.itemType],
  itemType: ownProps.itemType,
  numCharacters: state.data.characters.length,
  //itemLabel: ownProps.itemLabel
});
const mapDispatchToProps = (dispatch) => ({
  onItemClick: ((item) => dispatch(setSelectedToItem(item))),
  onInputFieldChange: (
    input, 
    fieldId, 
    selectedItem
  ) => dispatch(
    setInfo(selectedItem, fieldId, input)
  ),
})

/*
const DisplayItemPane = ({
  itemType,
  itemLabel,
  state,
  dispatch
}) => {
  return (
    <ItemPane
      selectedItem={state.selectedItem}
      items={state.data[itemType]}
      itemType={itemType}
      itemLabel={itemLabel}
      onItemClick={(item) => {
        dispatch(setSelectedToItem(item));
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
}*/


export default connect(mapStateToProps,mapDispatchToProps)(ItemPane);