import React from 'react';
import {connect} from 'react-redux';
import {deleteItem} from '../actions';


const DeleteItem = ({
	selectedItem,
	onClick,
	children
}) => (
	<button 
		className='deleteButton'
		onClick={() => onClick(selectedItem)}
	>
		{children}
	</button>
);

const mapStateToProps = (state) => ({
	selectedItem: state.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
	onClick: ((selectedItem, toSelect) => {
		dispatch(deleteItem(selectedItem));
	})
});
const DisplayDeleteItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteItem);

export default DisplayDeleteItem;