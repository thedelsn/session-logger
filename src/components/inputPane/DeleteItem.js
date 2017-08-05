import React from 'react';
import {connect} from 'react-redux';
import {deleteItem, setSelectedToItem} from '../../actions';

const DeleteItem = ({
  selectedItem,
  toSelect,
  onClick,
  children
}) => (
  <button 
    className='deleteButton'
    onMouseDown={(event) => {
      event.preventDefault();
      onClick(selectedItem, toSelect)
    }}
  >
    {children}
  </button>
);

const mapStateToProps = (state) => {
  const getToSelect = () => {
    const itemList = state.data[state.selectedItem.itemType];
    if (itemList && itemList[0]) {
      if (state.selectedItem.id !== itemList[0].id) {
        return itemList[0];
      } 
      if (itemList[1]) {
        return itemList[1];
      }
    }
    return {id: 0, itemType: state.selectedItem.itemType};
  };

  return {
    selectedItem: state.selectedItem,
    toSelect: getToSelect(),  
  };
};
const mapDispatchToProps = (dispatch) => ({
  onClick: ((selectedItem, toSelect) => {
    dispatch(deleteItem(selectedItem));
    dispatch(setSelectedToItem(toSelect));
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteItem);