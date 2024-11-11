//https://reactnavigation.org/docs/navigating-without-navigation-prop/
import { StackActions } from '@react-navigation/native';
import * as React from 'react';

const navigationRef = React.createRef();

const navigate = (name, params) => {
    if (navigationRef?.current?.isReady()) {
        navigationRef?.current?.navigate(name, params);
    } else {
    }
};

// Gets the current screen from navigation state
const getActiveRouteName = (state) => {
    const route = state.routes[state.index];
    if (route.state) {
        // Dive into nested navigators
        return getActiveRouteName(route.state);
    }

    return route.name;
};
const popToTop = () => {
    if (navigationRef.current?.canGoBack()) {
        navigationRef.current?.dispatch(StackActions.popToTop());
    }
};
const dispatch = (action) => {
    navigationRef.current?.dispatch(action);
};
const goBack = () => {
    navigationRef?.current?.dispatch(StackActions.pop(1));
};

const jumpTo = (routeName) => {
    navigationRef?.current?.jumpTo(routeName);
};
const resetStack = (routeName) => {
    navigationRef.current.reset({
        index: 0,
        routes: [{ name: routeName }]
    });
};

const push = (...args) => {
    if (navigationRef.current.isReady()) {
        navigationRef.current.dispatch(StackActions.push(...args));
    }
};

export { navigationRef, getActiveRouteName, navigate, popToTop, dispatch, goBack, resetStack, jumpTo, push };
