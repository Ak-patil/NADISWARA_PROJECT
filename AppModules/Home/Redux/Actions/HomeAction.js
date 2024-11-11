import { HomeActions } from './HomeActionsConst';

export const sumbitForbusinessAction = (updatedForm) => {
    return {
        type: HomeActions.SUMBIT_FORMBUSINESS_ACTION,
        payload: updatedForm
    };
};
