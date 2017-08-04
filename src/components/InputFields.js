import React from 'react';

import InputField from './InputField';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import CharacterSelectField from './InputCharacterSelectField';
import BonusMultSelectField from './InputBonusMultSelectField';
import PoiTypeSelectField from './InputPoiTypeSelectField';
import AdjustPotionButton from './AdjustPotionButton';

const PrependInputFields = ({itemType}) => {
  switch (itemType) {
    case 'expenses':
      return <div>
        <AdjustPotionButton paidBy='lmf' plusOrMinus='plus'/>
        <AdjustPotionButton paidBy='lmf' plusOrMinus='minus'/>
        <AdjustPotionButton paidBy='party' plusOrMinus='plus'/>
        <AdjustPotionButton paidBy='party' plusOrMinus='minus'/>
      </div>
    default:
      return null;
  }
};

const AppendInputFields = ({itemType}) => {
  switch (itemType) {
    case 'treasures':
      return <div>
        Claimed By
        <CharacterSelectField 
          id='treasureClaimedBy'
        />
      </div>
    case 'monsters':
      return <div>
        Bonus? <BonusMultSelectField
          id='bonusMult'
        />
      </div>
    case 'pois':
      return <div>
        Type <PoiTypeSelectField
          id='poiType'
        />
      </div>
    default:
      return null;
  }
};

const InputFields = ({
  fields,
  selectedItem
}) => (
  <div className= 'inputFields'>
    <div className='addDeleteButtons'>
      <AddItem
        itemType={fields[0].itemType}
        toFocusId={fields[0].id}
      >
        Add Item
      </AddItem>
      <DeleteItem
        selectedItem={selectedItem}
      >
        Delete Item
      </DeleteItem>
    </div>
    <PrependInputFields
      itemType={selectedItem.itemType}
    />
    {fields.map(field =>
      <InputField
        key={field.id}
        field={field}
      />
    )}
    <AppendInputFields
      itemType={selectedItem.itemType}
    />
  </div>
);

export default InputFields;