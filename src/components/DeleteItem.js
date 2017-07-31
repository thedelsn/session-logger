import React from 'react';
import {connect} from 'react-redux';
import {deleteItem, setSelectedToItem} from '../actions';


let DeleteItem = ({
	dispatch,
	selectedItem,
	toSelect,
	children
}) => (
	<button onClick={(item) => {
		dispatch(deleteItem(selectedItem));
		dispatch(setSelectedToItem(toSelect));
	}}
	>
		{children}
	</button>
);
DeleteItem = connect()(DeleteItem);

export default DeleteItem;