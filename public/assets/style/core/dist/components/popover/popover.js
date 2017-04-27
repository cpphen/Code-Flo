/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var react_dom_1 = require("react-dom");
var Tether = require("tether");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var PosUtils = require("../../common/position");
var TetherUtils = require("../../common/tetherUtils");
var Utils = require("../../common/utils");
var overlay_1 = require("../overlay/overlay");
var tooltip_1 = require("../tooltip/tooltip");
var Arrows = require("./arrows");
var SVG_SHADOW_PATH = "M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378" +
    "-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z";
var SVG_ARROW_PATH = "M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005" +
    "c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z";
var PopoverInteractionKind;
(function (PopoverInteractionKind) {
    PopoverInteractionKind[PopoverInteractionKind["CLICK"] = 0] = "CLICK";
    PopoverInteractionKind[PopoverInteractionKind["CLICK_TARGET_ONLY"] = 1] = "CLICK_TARGET_ONLY";
    PopoverInteractionKind[PopoverInteractionKind["HOVER"] = 2] = "HOVER";
    PopoverInteractionKind[PopoverInteractionKind["HOVER_TARGET_ONLY"] = 3] = "HOVER_TARGET_ONLY";
})(PopoverInteractionKind = exports.PopoverInteractionKind || (exports.PopoverInteractionKind = {}));
var Popover = (function (_super) {
    tslib_1.__extends(Popover, _super);
    function Popover(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.displayName = "Blueprint.Popover";
        _this.hasDarkParent = false;
        // a flag that is set to true while we are waiting for the underlying Portal to complete rendering
        _this.isContentMounting = false;
        _this.refHandlers = {
            popover: function (ref) {
                _this.popoverElement = ref;
                _this.updateTether();
                _this.updateArrowPosition();
            },
            target: function (ref) {
                _this.targetElement = ref;
            },
        };
        _this.handleContentMount = function () {
            if (Utils.isFunction(_this.props.popoverDidOpen) && _this.isContentMounting) {
                _this.props.popoverDidOpen();
                _this.isContentMounting = false;
            }
        };
        _this.handleTargetFocus = function (e) {
            if (_this.props.openOnTargetFocus && _this.isHoverInteractionKind()) {
                _this.handleMouseEnter(e);
            }
        };
        _this.handleTargetBlur = function (e) {
            if (_this.props.openOnTargetFocus && _this.isHoverInteractionKind()) {
                // if the next element to receive focus is within the popover, we'll want to leave the
                // popover open. we must do this check *after* the next element focuses, so we use a
                // timeout of 0 to flush the rest of the event queue before proceeding.
                _this.setTimeout(function () {
                    var popoverElement = _this.popoverElement;
                    if (popoverElement == null || !popoverElement.contains(document.activeElement)) {
                        _this.handleMouseLeave(e);
                    }
                }, 0);
            }
        };
        _this.handleMouseEnter = function (e) {
            // if we're entering the popover, and the mode is set to be HOVER_TARGET_ONLY, we want to manually
            // trigger the mouse leave event, as hovering over the popover shouldn't count.
            if (_this.props.inline
                && _this.isElementInPopover(e.target)
                && _this.props.interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY
                && !_this.props.openOnTargetFocus) {
                _this.handleMouseLeave(e);
            }
            else if (!_this.props.isDisabled) {
                // only begin opening popover when it is enabled
                _this.setOpenState(true, e, _this.props.hoverOpenDelay);
            }
        };
        _this.handleMouseLeave = function (e) {
            // user-configurable closing delay is helpful when moving mouse from target to popover
            _this.setOpenState(false, e, _this.props.hoverCloseDelay);
        };
        _this.handlePopoverClick = function (e) {
            var eventTarget = e.target;
            var shouldDismiss = eventTarget.closest("." + Classes.POPOVER_DISMISS) != null;
            var overrideDismiss = eventTarget.closest("." + Classes.POPOVER_DISMISS_OVERRIDE) != null;
            if (shouldDismiss && !overrideDismiss) {
                _this.setOpenState(false, e);
            }
        };
        _this.handleOverlayClose = function (e) {
            var eventTarget = e.target;
            // if click was in target, target event listener will handle things, so don't close
            if (!Utils.elementIsOrContains(_this.targetElement, eventTarget)
                || e.nativeEvent instanceof KeyboardEvent) {
                _this.setOpenState(false, e);
            }
        };
        _this.handleTargetClick = function (e) {
            // ensure click did not originate from within inline popover before closing
            if (!_this.props.isDisabled && !_this.isElementInPopover(e.target)) {
                if (_this.props.isOpen == null) {
                    _this.setState(function (prevState) { return ({ isOpen: !prevState.isOpen }); });
                }
                else {
                    _this.setOpenState(!_this.props.isOpen, e);
                }
            }
        };
        var isOpen = props.defaultIsOpen && !props.isDisabled;
        if (props.isOpen != null) {
            isOpen = props.isOpen;
        }
        _this.state = {
            isOpen: isOpen,
            ignoreTargetDimensions: false,
            targetHeight: 0,
            targetWidth: 0,
        };
        return _this;
    }
    Popover.prototype.render = function () {
        var className = this.props.className;
        var targetProps;
        if (this.isHoverInteractionKind()) {
            targetProps = {
                onBlur: this.handleTargetBlur,
                onFocus: this.handleTargetFocus,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
            };
            // any one of the CLICK* values
        }
        else {
            targetProps = {
                onClick: this.handleTargetClick,
            };
        }
        targetProps.className = classNames(Classes.POPOVER_TARGET, (_a = {},
            _a[Classes.POPOVER_OPEN] = this.state.isOpen,
            _a), className);
        targetProps.ref = this.refHandlers.target;
        var childrenBaseProps = this.props.openOnTargetFocus && this.isHoverInteractionKind()
            ? { tabIndex: 0 }
            : {};
        var children = this.props.children;
        if (typeof this.props.children === "string") {
            // wrap text in a <span> so that we have a consistent way to interact with the target node(s)
            children = React.DOM.span(childrenBaseProps, this.props.children);
        }
        else {
            var child = React.Children.only(this.props.children);
            // force disable single Tooltip child when popover is open (BLUEPRINT-552)
            var childProps = (this.state.isOpen && child.type === tooltip_1.Tooltip)
                ? tslib_1.__assign({}, childrenBaseProps, { isDisabled: true }) : childrenBaseProps;
            children = React.cloneElement(child, childProps);
        }
        return React.createElement(this.props.rootElementTag, targetProps, children, React.createElement(overlay_1.Overlay, { autoFocus: this.props.autoFocus, backdropClassName: Classes.POPOVER_BACKDROP, backdropProps: this.props.backdropProps, canEscapeKeyClose: this.props.canEscapeKeyClose, canOutsideClickClose: this.props.interactionKind === PopoverInteractionKind.CLICK, className: this.props.portalClassName, didOpen: this.handleContentMount, enforceFocus: this.props.enforceFocus, hasBackdrop: this.props.isModal, inline: this.props.inline, isOpen: this.state.isOpen, lazy: this.props.lazy, onClose: this.handleOverlayClose, transitionDuration: this.props.transitionDuration, transitionName: Classes.POPOVER }, this.renderPopover()));
        var _a;
    };
    Popover.prototype.componentDidMount = function () {
        this.componentDOMChange();
    };
    Popover.prototype.componentWillReceiveProps = function (nextProps) {
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
        if (nextProps.isOpen == null && nextProps.isDisabled && !this.props.isDisabled) {
            // ok to use setOpenState here because isDisabled and isOpen are mutex.
            this.setOpenState(false);
        }
        else if (nextProps.isOpen !== this.props.isOpen) {
            // propagate isOpen prop directly to state, circumventing onInteraction callback
            // (which would be invoked if this went through setOpenState)
            this.setState({ isOpen: nextProps.isOpen });
        }
    };
    Popover.prototype.componentWillUpdate = function (_, nextState) {
        if (!this.state.isOpen && nextState.isOpen) {
            this.isContentMounting = true;
            Utils.safeInvoke(this.props.popoverWillOpen);
        }
        else if (this.state.isOpen && !nextState.isOpen) {
            Utils.safeInvoke(this.props.popoverWillClose);
        }
    };
    Popover.prototype.componentDidUpdate = function () {
        this.componentDOMChange();
    };
    Popover.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.destroyTether();
    };
    Popover.prototype.validateProps = function (props) {
        if (props.isOpen == null && props.onInteraction != null) {
            console.warn(Errors.POPOVER_UNCONTROLLED_ONINTERACTION);
        }
        if (props.isModal && props.interactionKind !== PopoverInteractionKind.CLICK) {
            throw new Error(Errors.POPOVER_MODAL_INTERACTION);
        }
        if (props.isModal && props.inline) {
            throw new Error(Errors.POPOVER_MODAL_INLINE);
        }
        if (props.useSmartPositioning && props.inline) {
            throw new Error(Errors.POPOVER_SMART_POSITIONING_INLINE);
        }
        if (typeof props.children !== "string") {
            try {
                React.Children.only(props.children);
            }
            catch (e) {
                throw new Error(Errors.POPOVER_ONE_CHILD);
            }
        }
    };
    Popover.prototype.componentDOMChange = function () {
        if (this.props.useSmartArrowPositioning) {
            this.setState({
                targetHeight: this.targetElement.clientHeight,
                targetWidth: this.targetElement.clientWidth,
            });
        }
        if (!this.props.inline) {
            this.hasDarkParent = this.targetElement.closest("." + Classes.DARK) != null;
            this.updateTether();
        }
    };
    Popover.prototype.renderPopover = function () {
        var _a = this.props, inline = _a.inline, interactionKind = _a.interactionKind;
        var popoverHandlers = {
            // always check popover clicks for dismiss class
            onClick: this.handlePopoverClick,
        };
        if ((interactionKind === PopoverInteractionKind.HOVER)
            || (inline && interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY)) {
            popoverHandlers.onMouseEnter = this.handleMouseEnter;
            popoverHandlers.onMouseLeave = this.handleMouseLeave;
        }
        var positionClasses = TetherUtils.getAttachmentClasses(this.props.position).join(" ");
        var containerClasses = classNames(Classes.TRANSITION_CONTAINER, (_b = {}, _b[positionClasses] = inline, _b));
        var popoverClasses = classNames(Classes.POPOVER, (_c = {},
            _c[Classes.DARK] = this.props.inheritDarkTheme && this.hasDarkParent && !inline,
            _c), this.props.popoverClassName);
        var styles = this.getArrowPositionStyles();
        var transform = { transformOrigin: this.getPopoverTransformOrigin() };
        return (React.createElement("div", { className: containerClasses, ref: this.refHandlers.popover, style: styles.container },
            React.createElement("div", tslib_1.__assign({ className: popoverClasses, style: transform }, popoverHandlers),
                React.createElement("div", { className: Classes.POPOVER_ARROW, style: styles.arrow },
                    React.createElement("svg", { viewBox: "0 0 30 30" },
                        React.createElement("path", { className: Classes.POPOVER_ARROW + "-border", d: SVG_SHADOW_PATH }),
                        React.createElement("path", { className: Classes.POPOVER_ARROW + "-fill", d: SVG_ARROW_PATH }))),
                React.createElement("div", { className: Classes.POPOVER_CONTENT }, this.props.content))));
        var _b, _c;
    };
    Popover.prototype.getArrowPositionStyles = function () {
        if (this.props.useSmartArrowPositioning) {
            var dimensions = { height: this.state.targetHeight, width: this.state.targetWidth };
            return Arrows.getArrowPositionStyles(this.props.position, this.props.arrowSize, this.state.ignoreTargetDimensions, dimensions, this.props.inline);
        }
        else {
            return {};
        }
    };
    Popover.prototype.getPopoverTransformOrigin = function () {
        // if smart positioning is enabled then we must rely CSS classes to put transform origin
        // on the correct side and cannot override it in JS. (https://github.com/HubSpot/tether/issues/154)
        if (this.props.useSmartArrowPositioning && !this.props.useSmartPositioning) {
            var dimensions = { height: this.state.targetHeight, width: this.state.targetWidth };
            return Arrows.getPopoverTransformOrigin(this.props.position, this.props.arrowSize, dimensions);
        }
        else {
            return undefined;
        }
    };
    Popover.prototype.updateArrowPosition = function () {
        if (this.popoverElement != null) {
            var arrow = this.popoverElement.getElementsByClassName(Classes.POPOVER_ARROW)[0];
            var centerWidth = (this.state.targetWidth + arrow.clientWidth) / 2;
            var centerHeight = (this.state.targetHeight + arrow.clientHeight) / 2;
            var ignoreWidth = centerWidth > this.popoverElement.clientWidth
                && PosUtils.isPositionHorizontal(this.props.position);
            var ignoreHeight = centerHeight > this.popoverElement.clientHeight
                && PosUtils.isPositionVertical(this.props.position);
            if (!this.state.ignoreTargetDimensions && (ignoreWidth || ignoreHeight)) {
                this.setState({ ignoreTargetDimensions: true });
            }
            else if (this.state.ignoreTargetDimensions && !ignoreWidth && !ignoreHeight) {
                this.setState({ ignoreTargetDimensions: false });
            }
        }
    };
    Popover.prototype.updateTether = function () {
        var _this = this;
        if (this.state.isOpen && !this.props.inline && this.popoverElement != null) {
            // the .pt-popover-target span we wrap the children in won't always be as big as its children
            // so instead, we'll position tether based off of its first child.
            // NOTE: use findDOMNode(this) directly because this.targetElement may not exist yet
            var target = react_dom_1.findDOMNode(this).childNodes[0];
            // constraints is deprecated but must still be supported through tetherOptions until v2.0
            if (this.props.constraints != null) {
                this.props.tetherOptions.constraints = this.props.constraints;
            }
            var tetherOptions = TetherUtils.createTetherOptions(this.popoverElement, target, this.props.position, this.props.useSmartPositioning, this.props.tetherOptions);
            if (this.tether == null) {
                this.tether = new Tether(tetherOptions);
            }
            else {
                this.tether.setOptions(tetherOptions);
            }
            // if props.position has just changed, Tether unfortunately positions the popover based
            // on the margins from the previous position. delay a frame for styles to catch up.
            setTimeout(function () { return _this.tether.position(); });
        }
        else {
            this.destroyTether();
        }
    };
    Popover.prototype.destroyTether = function () {
        if (this.tether != null) {
            this.tether.destroy();
        }
    };
    // a wrapper around setState({isOpen}) that will call props.onInteraction instead when in controlled mode.
    // starts a timeout to delay changing the state if a non-zero duration is provided.
    Popover.prototype.setOpenState = function (isOpen, e, timeout) {
        var _this = this;
        // cancel any existing timeout because we have new state
        Utils.safeInvoke(this.cancelOpenTimeout);
        if (timeout > 0) {
            this.cancelOpenTimeout = this.setTimeout(function () { return _this.setOpenState(isOpen, e); }, timeout);
        }
        else {
            if (this.props.isOpen == null) {
                this.setState({ isOpen: isOpen });
            }
            else {
                Utils.safeInvoke(this.props.onInteraction, isOpen);
            }
            if (!isOpen) {
                Utils.safeInvoke(this.props.onClose, e);
            }
        }
    };
    Popover.prototype.isElementInPopover = function (element) {
        return this.popoverElement != null && this.popoverElement.contains(element);
    };
    Popover.prototype.isHoverInteractionKind = function () {
        return this.props.interactionKind === PopoverInteractionKind.HOVER
            || this.props.interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY;
    };
    return Popover;
}(abstractComponent_1.AbstractComponent));
Popover.defaultProps = {
    arrowSize: 30,
    className: "",
    content: React.createElement("span", null),
    defaultIsOpen: false,
    hoverCloseDelay: 300,
    hoverOpenDelay: 150,
    inheritDarkTheme: true,
    inline: false,
    interactionKind: PopoverInteractionKind.CLICK,
    isDisabled: false,
    isModal: false,
    openOnTargetFocus: true,
    popoverClassName: "",
    position: PosUtils.Position.RIGHT,
    rootElementTag: "span",
    tetherOptions: {},
    transitionDuration: 300,
    useSmartArrowPositioning: true,
    useSmartPositioning: false,
};
Popover = tslib_1.__decorate([
    PureRender
], Popover);
exports.Popover = Popover;
exports.PopoverFactory = React.createFactory(Popover);

//# sourceMappingURL=popover.js.map
