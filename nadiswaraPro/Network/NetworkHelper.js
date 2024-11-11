const logAPIErrorEvent = (error) => {
    // TODO  logError(ANALYTICS_EVENTS.API_ERROR, error);
};

const parseAPIEndPoint = (url) => {
    return 'E + ' + url;
};

export { logAPIErrorEvent, parseAPIEndPoint };
