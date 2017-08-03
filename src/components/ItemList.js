import React from 'react';
import {xpTable} from '../definitions'

//helper function
const itemText = (item) => {
	switch (item.itemType) {
		case 'characters':
			return(<div>
				{item.charName || '[Name]'}
				, Level {item.charLevel || '[Level]'}
				{' '}
				{item.charClass || '[Class]'}
			</div>);
		case 'treasures':
			return(<div>
				{item.treasureName || '[Name]'}
				, {item.valuePer}
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
		case 'monsters':
			const crIfValid = (cr) => {
				if (xpTable[cr]) {
					return 'CR ' + cr;
				}
				return '!!!INVALID CR!!!'
			}
			return(<div>
				{item.monsterName || '[Name]'}
				, {crIfValid(item.cr)}
				{' '}(
				{item.numKilled}
				{' '} killed, {' '}
				{item.numFled}
				{' '} fled)
			</div>);
		//TODO: finish this!
		case 'expenses':
			return(<div>
				{item.expenseName || '[Name]'}
				, {item.valuePer}
				{' '} gp
				{' (x' + item.expenseNum + ')'}
				{
					item.lmfExpense?
					' (LMF)' :
					null
				}
			</div>);
		default:
			return('');
	}
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
		{itemText(item)}
	</li>
);

const ItemList = ({
	items,
	onItemClick,
	selectedItem
}) => (
	<ul className='itemList'>
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