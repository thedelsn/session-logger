import React from 'react';
import {connect} from 'react-redux';

const ExportPane = ({data}) => (
  <textarea
    className='export'
    value={JSON.stringify(data)}
    readOnly='true'
    onClick={(e) => e.target.select()}
  />
)

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(ExportPane);