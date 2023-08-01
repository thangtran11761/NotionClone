import React from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'

import classes from './style.module.css'


//   ${props.placement === 'top' ? 'top: 10px' : 'bottom : -30px'};
const Popup = (props) => {
    const DivWrap = styled.div`
    ${props.placement === 'top' ? 'top: 10px' : 'bottom : -70px'};
    left : 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding : 10px;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
`

    return (
        <DivWrap
            className={classes['popup-add-page']}
            onClick={(e) => { e.stopPropagation() }}
        >
            <div className={classes['popup-div-close']}>
                <CloseOutlined
                    className={classes['popup-close']}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.closePopupHandler();
                    }}
                />
            </div>
            <div>
                menu
            </div>
        </DivWrap >
    )
}

export default Popup