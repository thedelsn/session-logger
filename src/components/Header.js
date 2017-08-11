import React from 'react';
import {setSelectedToItem} from '../actions';
import {connect} from 'react-redux';

const Link = ({
  active,
  children,
  onClick,
  toSelect
}) => {
  if (active) {
    return <button disabled='true' className='headerLink selected'>{children}</button>
  }
  return(
    <button
      className='headerLink notSelected'
      onMouseDown={event => {
        event.preventDefault();
        onClick(toSelect);
      }}
    >
      {children}
    </button>
  );
};

//DisplayLink
const mapStateToProps = (state, ownProps) => {
  let toSelect;
  if (ownProps.itemType === 'details') {
    toSelect={
      itemType: 'details',
      id: 0,
      ...state.data.details
    }
  } else {
    toSelect=(state.data[ownProps.itemType] ?
      state.data[ownProps.itemType][0] || {itemType: ownProps.itemType, id: -1} : 
      {itemType: ownProps.itemType}
    )
  }
  return {
    active: ownProps.itemType ===
    state.selectedItem.itemType,
    toSelect 
  }
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (toSelect) => {
    dispatch(setSelectedToItem(toSelect));
  }
});
const DisplayLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

const Header = () => (
  <p className='header'>
    <DisplayLink
      itemType='details'
    >
      Details
    </DisplayLink>
    <DisplayLink
      itemType='characters'
    >
      Characters
    </DisplayLink>
    <DisplayLink
      itemType='monsters'
    >
      Encounters
    </DisplayLink>
    <DisplayLink
      itemType='treasures'
    >
      Treasure
    </DisplayLink>
    <DisplayLink
      itemType='expenses'
    >
      Expenses
    </DisplayLink>
    <DisplayLink
      itemType='pois'
    >
      POI/New Hexes
    </DisplayLink>
  </p>
)

export default Header;