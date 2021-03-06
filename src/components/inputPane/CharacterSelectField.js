import React from 'react';
import {connect} from 'react-redux';

import {setInfo, setSelectedItemInfo} from '../../actions';

const CharacterSelectField = ({
  characters,
  id,
  disabled,
  onFieldChange,
  selectedItem
}) => (
  <select
    className='input'
    name='selectCharacter'
    id={id}
    disabled={disabled}
    value={selectedItem.treasureClaimedBy || 'none'}
    onChange={(event) => (
      onFieldChange(selectedItem, event.target.value*1, 'treasureClaimedBy')
    )}
  >
    <option value={'none'}>Unclaimed</option>
    {characters.map(character => (
      <option 
        value={character.id}
        key={character.id}
      >
        {character.charName}
      </option>
    ))}
    <option value='-1' key='lmf'>
      LMFfAG
    </option>
  </select>
);

const mapStateToProps = (state, ownProps) => ({
  selectedItem: state.selectedItem,
  characters: state.data.characters,
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
)(CharacterSelectField);