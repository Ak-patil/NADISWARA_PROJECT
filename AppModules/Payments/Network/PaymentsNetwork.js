import { NETWORK_METHOD, REST_API_TYPE } from '../../../nadiswaraPro/Network/SessionConst';
import { PaymentsVerifyEndpoint, UserIdEndpoint } from '../../../nadiswaraPro/Network/urls';

export const PaymentNetwork = {
    CreateUserIdApiCall: (payload) => ({
        method: NETWORK_METHOD.POST,
        url: UserIdEndpoint,
        config: {
            headers: {
                'Content-Type': 'application/json'
            }
        },
        data: payload,
        restAPIType: REST_API_TYPE.BASIC
    }),
    PaymentVerifyApiCall: (payload) => ({
        method: NETWORK_METHOD.POST,
        url: PaymentsVerifyEndpoint,
        config: {
            headers: {
                'Content-Type': 'application/json'
            }
        },
        data: payload,
        restAPIType: REST_API_TYPE.BASIC
    })
};
