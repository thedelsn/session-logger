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
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.itemType ===
  state.selectedItem.itemType,
  toSelect: (state.data[ownProps.itemType] ?
    state.data[ownProps.itemType][0] || {itemType: ownProps.itemType} : 
    {itemType: ownProps.itemType})
});
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