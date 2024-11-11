import { createAction } from "redux-actions";
import { PaymentsActionConst } from "./PaymentsActionConst";

export const enrollNowRequest = createAction(
  PaymentsActionConst.ENROLL_NOW_REQUEST
);
export const enrollSuccess = createAction(PaymentsActionConst.ENROLL_SUCCESS);

export const enrollFailure = createAction(PaymentsActionConst.ENROLL_FAILURE);
