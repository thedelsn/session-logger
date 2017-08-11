import React from 'react';
import {connect} from 'react-redux';

import {setInfo} from '../../actions';

const IncrementDaysOutButton = ({daysOut, selectedItem, onButtonClick}) => (
  <button 
    onClick={()=>onButtonClick(daysOut,selectedItem)}
  >
    +1 Day Out
  </button>
);

const mapStateToProps = (state) => ({
  daysOut: state.data.details.daysOut,
  selectedItem: state.selectedItem
})
const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (daysOut,selectedItem) => {
    dispatch(setInfo(selectedItem,'daysOut',daysOut+1))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncrementDaysOutButton);