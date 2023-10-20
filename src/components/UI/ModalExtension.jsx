import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./ModalExtension.module.css";

const Backdrop = (props) => {
    return <div
        className={classes.backdrop}
        onClick={(e) => {
            props.onCloseModal()
            e.stopPropagation();
        }}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const ModalExtension = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onCloseModal={props.onCloseModal} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default ModalExtension;
