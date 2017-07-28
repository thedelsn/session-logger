import React from 'react';
import {xpTable} from '../definitions'

//helper function
const itemOutput = (item) => {
	let output;
	const crIfValid = (cr) => {
		if (xpTable[cr]) {
			return 'CR ' + cr;
		}
		return '!!!INVALID CR!!!'
	}
	switch (item.itemType) {
		case 'characters':
			output=(<div>
				{item.charName || '[Name]'}
				, Level {item.charLevel || '[Level]'}
				{' '}
				{item.charClass || '[Class]'}
			</div>);
			break;
		case 'treasures':
			output=(<div>
				{item.treasureName || '[Name]'}
				, {item.valuePer || '0'}
				{' '} gp
				{item.treasureNum >1 ?
					' (x' + item.treasureNum + ')' :
					''
				}
				{
				 	item.isMagicItem ?
				 	' (magic item)' :
				 	null
				}
			</div>);
			break;
		case 'monsters':
			output=(<div>
				{item.monsterName || '[Name]'}
				, {crIfValid(item.cr)}
				{' '}(
				{item.numKilled || '0'}
				{' '} killed, {' '}
				{item.numFled || '0'}
				{' '} fled)
			</div>);
			break;
		default:
			output=('');
			break;
	}
	return output;
}

const Item = ({
	item,
	onClick,
	selectedItem
}) => (
	<li
		key={item.id}
		onClick={onClick}
		style={{
			textDecoration:
				(selectedItem.id === item.id && 
					selectedItem.itemType === item.itemType) ?
				'underline' :
				'none'
		}}
	>
		{itemOutput(item)}
	</li>
);

const ItemList = ({
	items,
	onItemClick,
	selectedItem
}) => (
	<ul>
		{items.map(item => (
			<Item
				key= {item.id}
				selectedItem= {selectedItem}
				item= {item}
				onClick= {() => onItemClick(item)}
			/>
		))}
	</ul>
);

export default ItemList;