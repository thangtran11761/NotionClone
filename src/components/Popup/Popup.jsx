import React, { useState, memo, useCallback } from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import classes from './style.module.css'

const DivWrap = styled.div`
  ${({ placement }) =>
        placement === 'top' ? 'top: 10px' : 'bottom : -150px'};
  left: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  width: 360px;
  background-color: #fff;
  z-index: 10;
`;

const Popup = memo((props) => {
    const [namePage, setNamePage] = useState("")
    const [typePage, setTypePage] = useState("text")

    const dispatch = useDispatch();

    const onChangeNamePage = useCallback((event) => {
        event.preventDefault();
        setNamePage(event.target.value)
    }, [])

    const onChangeTypePage = (event) => {
        event.preventDefault();
        setTypePage(event.target.value)
    }

    const addPageHandler = () => {
        dispatch({ type: "addPage", data: { type: typePage, name: namePage } });
        setNamePage("")
        setTypePage("text")
        props.closePopupHandler()
    };

    return (
        <DivWrap
            className={classes['popup-add-page']}
            onClick={(e) => { e.stopPropagation() }}
            placement={props.placement}
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
            <div className={classes['popup-wrap-component']}>
                <input
                    onChange={onChangeNamePage}
                    className={classes['name-page']}
                    placeholder='Enter your page name ...'
                    value={namePage}
                >
                </input>
                <div>
                    <select
                        className={classes['select-page']}
                        value={typePage}
                        onChange={onChangeTypePage}
                    >
                        <option key="task" value="task" icon="CheckSquareOutlined">
                            task
                        </option>
                        <option key="schedule" value="schedule">
                            schedule
                        </option>
                        <option key="project" value="project">
                            project
                        </option>
                        <option key="text" value="text">
                            text
                        </option>
                    </select>
                    <button
                        className={classes['btn-add-page']}
                        onClick={addPageHandler}
                    >
                        Add
                    </button>
                </div>

            </div>
        </DivWrap >
    )
})

export default Popup