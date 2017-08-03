import React from 'react';
import {connect} from 'react-redux';
import {deleteItem, setSelectedToItem} from '../actions';


const DeleteItem = ({
	selectedItem,
	toSelect,
	onClick,
	children
}) => (
	<button 
		className='deleteButton'
		onClick={() => onClick(selectedItem, toSelect)}
	>
		{children}
	</button>
);

const mapStateToProps = (state) => {
	const getToSelect = () => {
		const itemList = state.data[state.selectedItem.itemType]
		if (itemList && itemList[0]) {
			if (state.selectedItem.id !== itemList[0].id) {
				return itemList[0];
			} 
			return itemList[1];
		}
		return {id: 0, itemType: state.visiblePane};
	};
	return {
		selectedItem: state.selectedItem,
		toSelect: getToSelect(),	
	};
};

const mapDispatchToProps = (dispatch) => ({
	onClick: ((selectedItem, toSelect) => {
		dispatch(deleteItem(selectedItem));
		dispatch(setSelectedToItem(toSelect));
	})
});
const DisplayDeleteItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteItem);

export default DisplayDeleteItem;