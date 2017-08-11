import React from 'react';
import {connect} from 'react-redux';

import {setInfo, setSelectedItemInfo} from '../../actions';

const PoiTypeSelectField = ({
  id,
  onFieldChange,
  selectedItem
}) => (
  <select
    className='input'
    name='selectPoiType'
    id={id}
    value={selectedItem.poiType || 'poi'}
    onChange={(event) => (
      onFieldChange(selectedItem, event.target.value, 'poiType')
    )}
  >
    <option value='mpoi'>Minor Point of Interest</option>
    <option value='poi'>Point of Interest</option>
    <option value='hex'>New Hex</option>
  </select>
);

const mapStateToProps = (state, ownProps) => ({
  selectedItem: state.selectedItem,
  id: ownProps.id,
});
const mapDispatchToProps = (dispatch) => ({
  onFieldChange: ((selectedItem, input, fieldId) => {
    dispatch(setInfo(selectedItem, fieldId, input));
    dispatch(setSelectedItemInfo(fieldId, input));
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoiTypeSelectField);