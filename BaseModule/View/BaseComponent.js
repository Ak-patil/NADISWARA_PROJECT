import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import BasicView from '../CommonUI/BasicView';
import DefaultAppBar from '../CommonUI/DefaultAppBar';
import { VIEW_ID } from '../Utils/Constants';
import { isValidElement } from '../Utils/helpers';
import styles from './style/BaseStyle';

class BaseComponent extends Component {
    render() {
        if (this.props.showHeader) {
            return (
                <BasicView style={isValidElement(this.props.containerStyle) ? this.props.containerStyle : styles.container}>
                    <DefaultAppBar
                        onLayoutChange={this.props.onAppBarLayoutChange}
                        id={VIEW_ID.APP_BAR}
                        icon={this.props.icon}
                        actions={this.props.showCommonActions ? [this.renderDefaultActions(), this.props.actions] : this.props.actions}
                        title={this.props.title}
                        customView={this.props.customView}
                        handleLeftActionPress={this.props.handleLeftActionPress}
                        showCommonActions={this.props.showCommonActions}
                        headerStyle={this.props.headerStyle}
                        showElevation={this.props.showElevation}
                        rightIcon={this.props.rightIcon}
                        handelRightIconPressed={this.props.handelRightIconPressed}
                    />
                    {this.props.children}
                </BasicView>
            );
        } else {
            return <BasicView style={styles.container}>{this.props.children}</BasicView>;
        }
    }

    renderDefaultActions() {
        return <Fragment key={'actions'} />;
    }
}

BaseComponent.propTypes = {
    showHeader: PropTypes.bool,
    title: PropTypes.string,
    actions: PropTypes.node, // Renders Right Action Buttons on the ParentComponent
    customView: PropTypes.node, //Renders CustomView on the ParentComponent
    handleLeftActionPress: PropTypes.func, //Callback for the Left Action Button of the ApBar
    showCommonActions: PropTypes.bool, // By default, show all the common action buttons to the ParentComponent
    showSearch: PropTypes.bool,
    showElevation: PropTypes.bool,
    showNotificationOption: PropTypes.bool
};
BaseComponent.defaultProps = {
    showHeader: false,
    icon: null,
    customView: undefined,
    showCommonActions: true,
    showNotificationOption: false
};

export default BaseComponent;
