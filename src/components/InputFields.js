import React from 'react';

import DisplayInputField from './InputField';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import CharacterSelectField from './InputCharacterSelectField'

const ExtraInputFields = ({itemType}) => {
	switch (itemType) {
		case 'treasures':
			return <div>
				Claimed By
				<CharacterSelectField 
					id='treasureClaimedBy'
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
		{fields.map(field =>
			<DisplayInputField
				key={field.id}
				field={field}
			/>
		)}
		<ExtraInputFields
			itemType={selectedItem.itemType}
		/>
	</div>
);

export default InputFields;