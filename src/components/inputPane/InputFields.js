import React from 'react';

import InputField from './InputField';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import CharacterSelectField from './CharacterSelectField';
import BonusMultSelectField from './BonusMultSelectField';
import PoiTypeSelectField from './PoiTypeSelectField';
import AdjustPotionButton from './AdjustPotionButton';
import IncrementDaysOutButton from './IncrementDaysOutButton';

const PrependInputFields = ({itemType, disabled}) => {
  switch (itemType) {
    case 'expenses':
      return <div>
        <AdjustPotionButton 
          paidBy='lmf' 
          plusOrMinus='plus' 
          disabled={disabled}
        />
        <AdjustPotionButton 
          paidBy='lmf' 
          plusOrMinus='minus' 
          disabled={disabled}
        />
        <AdjustPotionButton 
          paidBy='party' 
          plusOrMinus='plus' 
          disabled={disabled}
        />
        <AdjustPotionButton 
          paidBy='party' 
          plusOrMinus='minus' 
          disabled={disabled}
        />
      </div>
    case 'details':
      return <div>
        <IncrementDaysOutButton />
      </div>
    default:
      return null;
  }
};

const AppendInputFields = ({itemType, disabled}) => {
  switch (itemType) {
    case 'treasures':
      return <div>
        Claimed By
        <CharacterSelectField 
          id='treasureClaimedBy'
          disabled={disabled}
        />
      </div>
    case 'monsters':
      return <div>
        Bonus? <BonusMultSelectField
          id='bonusMult'
          disabled={disabled}
        />
      </div>
    case 'pois':
      return <div>
        Type <PoiTypeSelectField
          id='poiType'
          disabled={disabled}
        />
      </div>
    default:
      return null;
  }
};

const AddDeleteButtons = ({
  fields,
  selectedItem
}) => {
  const disabled = selectedItem.itemType === 'details' ?
    true :
    false;
  return (
    <div className='addDeleteButtons'>
      <AddItem
        itemType={fields[0].itemType}
        toFocusId={fields[0].id}
        disabled={disabled}
      >
        New<span> Item</span>
      </AddItem>
      <DeleteItem
        itemType={selectedItem.itemType}
        selectedItem={selectedItem}
        disabled={disabled}
      >
        Delete<span> Item</span>
      </DeleteItem>
    </div>
  )
};

const InputFields = ({
  fields,
  selectedItem
}) => (
  <div className= 'inputFields'>
    <AddDeleteButtons
      fields={fields}
      selectedItem={selectedItem}
    />
    <PrependInputFields
      itemType={selectedItem.itemType}
      disabled={selectedItem.id === -1 ?
          true :
          false}
    />
    {fields.map(field =>
      <InputField
        key={field.id}
        field={field}
        disabled={selectedItem.id === -1 ?
          true :
          false}
      />
    )}
    <AppendInputFields
      itemType={selectedItem.itemType}
      disabled={selectedItem.id === -1 ?
          true :
          false}
    />
  </div>
);

export default InputFields;