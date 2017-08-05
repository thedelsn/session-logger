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
    onMouseDown={(event) => {
      event.preventDefault();
      const action = addItem(itemType);
      dispatch(action)
      //TODO: fix this it's awful form
      dispatch(setSelectedToItem({
        itemType: action.itemType, 
        id: action.id,
        treasureClaimedBy: 'none',
        poiType: 'poi',
        bonusMult: 1,
      }))
      document.getElementById(toFocusId).focus();
    }}
  >
    {children}
  </button>
);

export default connect()(AddItem);