import { NETWORK_METHOD, REST_API_TYPE } from '../../../nadiswaraPro/Network/SessionConst';
import { GetprofiledetailsEndpoint, UpdateprofiledetailsEndpoint } from '../../../nadiswaraPro/Network/urls';

export const MyprofileNetwork = {
    getProfileRequestApiCall: () => ({
        method: NETWORK_METHOD.GET,
        config: {
            headers: {
                'content-type': 'application/json'
            }
        },
        url: GetprofiledetailsEndpoint,
        restAPIType: REST_API_TYPE.BASIC
    }),
    updateProfileRequestApiCall: (payload) => ({
        method: NETWORK_METHOD.POST,
        config: {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },
        url: UpdateprofiledetailsEndpoint,
        data: payload,
        restAPIType: REST_API_TYPE.BASIC
    })
};
