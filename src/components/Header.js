import React from 'react';
import {setVisiblePane, setSelectedToItem} from '../actions';
import {connect} from 'react-redux';
//import fieldTypes from '../definitions';

const Link = ({
	active,
	children,
	onClick,
	toSelect
}) => {
	if (active) {
		return <button disabled='true' className='headerLink selected'>{children}</button>
	}
	return(
		<button
			className='headerLink notSelected'
			onClick={e => {
				e.preventDefault();
				onClick(toSelect);
			}}
		>
			{children}
		</button>
	);
};

//DisplayLink
const mapStateToProps = (state, ownProps) => ({
	active: ownProps.visiblePane ===
	state.visiblePane,
	toSelect: (state.data[ownProps.visiblePane] ?
		state.data[ownProps.visiblePane][0] || {itemType: ownProps.visiblePane} : 
		{itemType: ownProps.visiblePane})
});
const mapDispatchToProps = (dispatch, ownProps) => ({
	onClick: (toSelect) => {
		dispatch(setVisiblePane(ownProps.visiblePane));
		dispatch(setSelectedToItem(toSelect));
	}
});
const DisplayLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link);

const Header = () => (
	<p>
		<DisplayLink
			visiblePane='characters'
		>
			Characters
		</DisplayLink>
		{' '}
		<DisplayLink
			visiblePane='treasures'
		>
			Treasure
		</DisplayLink>
		{' '}
		<DisplayLink
			visiblePane='monsters'
		>
			Encounters
		</DisplayLink>
	</p>
)

export default Header;