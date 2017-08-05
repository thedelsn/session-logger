import React from 'react';
import {connect} from 'react-redux';

import {setInfo, setSelectedItemInfo} from '../../actions';

const BonusMultSelectField = ({
  id,
  onFieldChange,
  disabled,
  selectedItem
}) => (
  <select
    className='input'
    name='selectCharacter'
    id={id}
    disabled={disabled}
    value={selectedItem.bonusMult || '1'}
    onChange={(event) => (
      onFieldChange(selectedItem, event.target.value, 'bonusMult')
    )}
  >
    <option value='1'>Normal</option>
    <option value='2'>Local (1/2xp)</option>
    <option value='4'>Regional (full xp)</option>
  </select>
);

const mapStateToProps = (state, ownProps) => ({
  selectedItem: state.selectedItem,
  id: ownProps.id,
  disabled: ownProps.disabled,
});
const mapDispatchToProps = (dispatch) => ({
  onFieldChange: ((selectedItem, input, fieldId) => {
    dispatch(setInfo(selectedItem, fieldId, input));
    dispatch(setSelectedItemInfo(fieldId, input));
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BonusMultSelectField);