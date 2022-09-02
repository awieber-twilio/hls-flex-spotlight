const ACTION_TOGGLE_PANEL2 = "TOGGLE_PANEL";

const initialState = {
  shouldShowPanel: false,
  shouldShowTelehealth: false,
};

export class Actions {
  static togglePanel = () => ({ type: ACTION_TOGGLE_PANEL2 });
}

export function reduce(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case ACTION_TOGGLE_PANEL2: {
      return {
        ...state,
        shouldShowPanel: !state.shouldShowPanel,
      };
    }
    default:
      return state;
  }
}
