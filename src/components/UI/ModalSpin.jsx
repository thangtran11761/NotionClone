import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Spin } from "antd";

import classes from "./ModalSpin.module.css";

const portalElement = document.getElementById("spin");

const ModalSpin = () => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <div className={classes.modal}>
                    <Spin />
                </div>,
                portalElement
            )}
        </Fragment>
    );
};

export default ModalSpin;
