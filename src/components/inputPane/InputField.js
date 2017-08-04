import React from 'react';
import {connect} from 'react-redux';
import {setInfo, setSelectedItemInfo} from '../../actions'

const InputField = ({field, selectedItem, onFieldChange}) => (
  <div className='inputField'>
    {field.display}
    <input
      className='input'
      {...field}
      value= {selectedItem[field.id] || ''}
      checked= {selectedItem[field.id] || false}
      onChange={(event) => {
        let value;
        switch (event.target.type) {
          case 'checkbox':
            value=event.target.checked;
            break;
          case 'number':
            value=event.target.value*1;
            break;
          default:
            value=event.target.value;
            break;
        }
        return onFieldChange(
          value,
          selectedItem,
          field.id
        );
      }}
    />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  selectedItem: state.selectedItem,
  field: ownProps.field,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onFieldChange: ((input, selectedItem, fieldId) => {
    dispatch(setInfo(selectedItem, fieldId, input));
    dispatch(setSelectedItemInfo(fieldId, input));
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputField);