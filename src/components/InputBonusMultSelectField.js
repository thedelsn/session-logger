import React from 'react';
import {connect} from 'react-redux';

import {setInfo, setSelectedInfo} from '../actions';

const BonusMultSelectField = ({
  id,
  onFieldChange,
  selectedItem
}) => (
  <select
    className='input'
    name='selectCharacter'
    id={id}
    value={selectedItem.bonusMult || '1'}
    onChange={(event) => (
      onFieldChange(selectedItem, event.target.value, 'bonusMult')
    )}
  >
    <option value='1'>Normal</option>
    <option value='2'>Regional (1/2xp)</option>
    <option value='4'>Special (full xp)</option>
  </select>
);

const mapStateToProps = (state, ownProps) => ({
  selectedItem: state.selectedItem,
  id: ownProps.id,
});
const mapDispatchToProps = (dispatch) => ({
  onFieldChange: ((selectedItem, input, fieldId) => {
    dispatch(setInfo(selectedItem, fieldId, input));
    dispatch(setSelectedInfo(fieldId, input));
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BonusMultSelectField);