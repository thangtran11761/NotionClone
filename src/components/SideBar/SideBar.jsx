import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined } from '@ant-design/icons'

import { getPages } from '../../services/PageService'
import Popup from '../Popup/Popup';
import classes from './style.module.css'
import { PageContext } from '../../context/Page.context';

const SideBar = () => {
    const [pages, setPages] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    const pageCtx = useContext(PageContext)

    const activity = useSelector((state) => state.activity);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('getPages');
        getPages().then((res) => setPages(res))
    }, [activity])

    // const demoHandler = () => {
    //     dispatch({ type: "demo" });
    // };

    function getDistanceToViewportTop(element) {
        var rect = element.getBoundingClientRect();
        var distance = rect.top;
        return distance;
    }

    const placement = "bottom";

    const openPopupHandler = (e) => {
        e.preventDefault();
        var myDiv = document.getElementById("div-add-page");
        var distanceToViewportTop = getDistanceToViewportTop(myDiv);

        if (distanceToViewportTop > 600) {
            placement = "top"
            setOpenPopup(true)
        }
        else {
            setOpenPopup(true)
        }
        console.log("Khoảng cách của div đến đỉnh của viewport: " + distanceToViewportTop + "px");
    }

    const closePopupHandler = () => {
        setOpenPopup(false)
        console.log('closePopupHandler');
    }

    return (
        <div className={classes['container-sidebar']}>
            {pages.map(page => {
                return (
                    <div key={page.id} onClick={() => pageCtx.onChangePageHandler(page)}>{page.name}</div>
                )
            })}
            <div id='div-add-page' className={classes['btn-add-page']} onClick={openPopupHandler}>
                <PlusOutlined />
                Add a page
                {openPopup && <Popup placement={placement} closePopupHandler={closePopupHandler}></Popup>}
            </div>
        </div>
    )
}

export default SideBar