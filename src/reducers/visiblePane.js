const setVisiblePane = (state='characters', action) => {
  switch (action.type) {
    case 'SET_VISIBLE_PANE':
      return action.visiblePane;
    default:
      return state;
  }
}

export default setVisiblePane;