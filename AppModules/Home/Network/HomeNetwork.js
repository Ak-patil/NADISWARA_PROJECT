import { NETWORK_METHOD, REST_API_TYPE } from '../../../gigfws/Network/SessionConst';
import { AuthServiceEndpoint } from '../../../gigfws/Network/urls';

export const HomeNetwork = {
    forBusinessApiCall: (payload) => ({
        method: NETWORK_METHOD.POST,
        url: `${AuthServiceEndpoint}/fws_business`,
        data: payload,
        restAPIType: REST_API_TYPE.BASIC
    })
};
