import React from 'react';
import {connect} from 'react-redux';
import {addItem, setSelectedToItem} from '../../actions';

const AddItem = ({ 
  dispatch,
  itemType,
  toFocusId,
  children
}) => (
  <button 
    className= 'addButton'
    onClick={() => {
      const action = addItem(itemType);
      dispatch(action);
      dispatch(setSelectedToItem({itemType: action.itemType, id: action.id}))
      document.getElementById(toFocusId).focus();
    }}
  >
    {children}
  </button>
);

export default connect()(AddItem);