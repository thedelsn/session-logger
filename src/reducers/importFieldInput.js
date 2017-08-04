const importFieldInput = (state='', action) => {
  switch (action.type) {
    case 'UPDATE_IMPORT_FIELD_INPUT':
      return action.input;
    default:
      return state;
  }
}

export default importFieldInput;