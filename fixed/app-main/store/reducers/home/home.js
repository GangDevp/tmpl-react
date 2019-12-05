let initState = {
  welcomeText: '',
  dateText: '',
  supportLinks: []
};

export function homeReducer(state = initState, action) {
  switch (action.type) {
    case 'INIT_WELCOME_TEXT':
      return Object.assign({}, state, {
        welcomeText: action.welcomeText
      });
    case 'GET_DATE_TEXT':
      return Object.assign({}, state, {
        dateText: action.dateText
      });
    case 'GET_SUPPORT_LINKS':
      return Object.assign({}, state, {
        supportLinks: action.supportLinks
      });
    default:
      return { ...state };
  }
}