import React from 'react';
import {connect} from 'react-redux';

import LogOutput from './LogOutput'
import Header from './Header';
import ItemPane from './ItemPane';
import ImportExportPane from './ImportExportPane';

const SessionLoggerApp = ({
  state,
  dispatch,
}) => {
  return (
    <div>
      <div className='test'>
      <Header />
      
      <ItemPane
        itemType={state.selectedItem.itemType}
        itemLabel='Item'
        state={state}
        dispatch={(action) => {dispatch(action)}}
      />
      </div>
      <span className='logOutputLabel'>Log Output</span>
      <LogOutput
        state={state}
      />
      <div className='importExportPane'>
      Import / Export session data
      <ImportExportPane /></div>
    </div>
  );
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(SessionLoggerApp);