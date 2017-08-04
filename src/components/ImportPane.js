import React from 'react';
import {connect} from 'react-redux';

//import {setSelectedToItem} from '../actions';

const ImportPane = ({
  dispatch,
  importFieldInput
}) => (
  <div>
    <textarea
      className='import'
      value={importFieldInput}
      onChange={(event) => {
        dispatch({
          type:'UPDATE_IMPORT_FIELD_INPUT',
          input: event.target.value,
        });
      }}
    />
    <button
      className='import'
      onClick={() => {
        dispatch({
          type: 'IMPORT_DATA',
          toImport: importFieldInput,
        })
      }}
    >
      Import
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  importFieldInput: state.importFieldInput
});
const mapDispatchToProps = (dispatch) => ({
  dispatch: ((action) => dispatch(action)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ImportPane);