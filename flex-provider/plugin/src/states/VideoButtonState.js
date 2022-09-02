const ACTION_TOGGLE_TELEHEALTH = 'TOGGLE_TELEHEALTH';

const initialState = {
  shouldShowTelehealth: false,
};

export class Actions {
  static toggleTelehealth = () => ({ type: ACTION_TOGGLE_TELEHEALTH });
}

export function reduce(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case ACTION_TOGGLE_TELEHEALTH: {
      return {
        ...state,
        shouldShowTelehealth: !state.shouldShowTelehealth,
      }
    } 
    default:
      return state;
  }
}
