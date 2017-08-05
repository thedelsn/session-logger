import React from 'react';
import {connect} from 'react-redux';

import {adjustPotions} from '../../actions';

const AdjustPotionButton = ({paidBy, plusOrMinus, disabled, onButtonClick}) => (
  <button 
    disabled={disabled}
    onClick={()=>onButtonClick(
      paidBy === 'lmf'?
      0 :
      1,
      plusOrMinus
    )}
  >
    {plusOrMinus === 'plus' ? '+' : '-'}
    1 {paidBy==='lmf' ? 'LMF ' : 'party '} 
    potion
  </button>
);

const mapStateToProps = (state, ownProps) => ({
  paidBy: ownProps.paidBy,
  plusOrMinus: ownProps.plusOrMinus,
  disabled: ownProps.disabled,
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onButtonClick: (potionsId, plusOrMinus) => {
    dispatch(adjustPotions(potionsId, plusOrMinus))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdjustPotionButton);

