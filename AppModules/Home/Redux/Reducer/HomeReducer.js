import { HomeActions } from '../Actions/HomeActionsConst';

const INITIAL_STATE = {
    submitLoader: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HomeActions.SUMBIT_FORMBUSINESS_ACTION:
            return {
                ...state,
                submitLoader: true
            };
        default:
            return state;
    }
};
