import React from 'react';
import ExportPane from './ExportPane';
import ImportPane from './ImportPane';

const ImportExportPane = () => (
  <div className='importExportPane'>
    <ExportPane />
    <ImportPane />
  </div>
);

export default ImportExportPane;