import React from 'react';
import {connect} from 'react-redux';
//import {setInfo} from '../actions';


const InputField = ({
	field, 
	onFieldChange,
	selectedItem
}) => {
	let input;
	return (
		<div>
			{field.display}
			<input
				{...field}
				defaultValue= {selectedItem[field.id]}
				defaultChecked= {selectedItem[field.id]}
				ref={node => {input = node;}}
				onChange={() => onFieldChange(
					field.type!=='checkbox' ?
						input.value :
						input.checked
					,
					field.id,
				)}
			/>
		</div>
	);
}

const CharacterSelect = ({characters, onFieldChange, selectedItem}) => {
	let input;
	return (
		<select 
			name='selectCharacter'
			id='claimedBy'
			defaultValue={selectedItem.claimedBy}
			ref={node => {input = node}}
			onChange={() => onFieldChange(input.value, 'claimedBy')}
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
}

const ExtraInputFields = ({itemType, data, onFieldChange, selectedItem}) => {
	switch (itemType) {
		case 'treasures':
			return <div>
				Claimed By<CharacterSelect
					characters={data.characters}
					selectedItem={selectedItem}
					onFieldChange={
						(input, fieldId, selectedItem) => 
						onFieldChange(input, fieldId, selectedItem)
					}
				/>
			</div>
		default:
			return null;
	}
};

//DisplayExtraInputFields
const mapStateToProps = (state, ownProps) => ({
	data: state.data,
	itemType: ownProps.itemType,
	onFieldChange: (input, fieldId, selectedItem) =>
		ownProps.onFieldChange(input, fieldId, selectedItem),
	selectedItem: state.selectedItem
});
const DisplayExtraInputFields = connect(
	mapStateToProps
)(ExtraInputFields);

const InputFields = ({
	fields,
	onInputFieldChange,
	selectedItem
}) => (
	<div>
		{fields.map(field =>
			<InputField
				key={field.id}
				field={field}
				selectedItem={selectedItem}
				onFieldChange={
					(input,fieldId) => 
					onInputFieldChange(input, fieldId, selectedItem)
				}
			/>
		)}
		<DisplayExtraInputFields
			itemType={fields[0].itemType}
			onFieldChange={
				(input, fieldId) =>
				onInputFieldChange(input, fieldId, selectedItem)
			}
		/>
	</div>
);

export default InputFields;