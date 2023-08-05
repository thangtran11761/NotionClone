import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
    PlusOutlined,
    UpOutlined,
    DownOutlined,
    CheckSquareOutlined,
    CalendarOutlined,
    ProjectOutlined,
    FormOutlined,
    EllipsisOutlined
} from '@ant-design/icons'

import { getPages } from '../../services/PageService'
import Popup from '../Popup/Popup';
import classes from './style.module.css'
import { PageContext } from '../../context/Page.context';
import ModalExtension from '../UI/ModalExtension';

const SideBar = () => {
    const [pages, setPages] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    const [openPageItem, setOpenPageItem] = useState(true)
    const [openModalExtension, setOpenModalExtension] = useState({
        status: false,
        idPage: null
    })

    const pageCtx = useContext(PageContext)

    const activity = useSelector((state) => state.activity);

    const dispatch = useDispatch();

    useEffect(() => {
        getPages().then((res) => setPages(res))
    }, [activity])

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
    }

    const onCloseModalExtensionHandler = () => {
        setOpenModalExtension({ status: false })
    }

    const onOpenModalExtensionHandler = () => {
        setOpenModalExtension({ status: true })
    }

    const deletePageHandler = (id) => {
        dispatch({ type: "removePage", data: { id: id } });
    }

    const forwardIconComponent = (type) => {
        if (type === "task") return <CheckSquareOutlined />
        if (type === "schedule") return <CalendarOutlined />
        if (type === "project") return <ProjectOutlined />
        if (type === "text") return <FormOutlined />
    }

    return (
        <div className={classes['container-sidebar']}>
            <div className={classes['title-component']}>
                <p>Shared</p>
            </div>
            <div className={classes['title-component']}>
                <p>Page</p>
                {openPageItem ?
                    <UpOutlined
                        className={classes['icon']}
                        onClick={() => setOpenPageItem(!openPageItem)}
                    /> :
                    <DownOutlined
                        className={classes['icon']}
                        onClick={() => setOpenPageItem(!openPageItem)}
                    />
                }
            </div>
            {openPageItem &&
                <div className={classes['item-component']}>
                    {pages.map(page => {
                        return (
                            <div
                                key={page.id}
                                className={classes['sidebar-page-item']}
                                onClick={() => pageCtx.onChangePageHandler(page)}
                            >
                                <div>{forwardIconComponent(page.type)} {page.name}</div>
                                <div
                                    className={classes['page-item-extension']}
                                    onClick={(e) => {
                                        setOpenModalExtension({ action: true, idPage: page.id })
                                        e.stopPropagation()
                                    }}
                                >
                                    <EllipsisOutlined />
                                </div>
                                {openModalExtension.action === true && openModalExtension.idPage === page.id &&
                                    <ModalExtension onCloseModal={onCloseModalExtensionHandler}>
                                        < div
                                            className={classes['modal-extension']}
                                            onClick={() => deletePageHandler(page.id)}
                                        >
                                            Xóa trang {page.name}
                                        </div>
                                    </ModalExtension>
                                }
                            </div>
                        )
                    })}
                </div>
            }
            <hr></hr>
            <div id='div-add-page' className={classes['btn-add-page']} onClick={openPopupHandler}>
                <PlusOutlined />
                Add a page
                {openPopup && <Popup placement={placement} closePopupHandler={closePopupHandler}></Popup>}
            </div>
        </div >
    )
}

export default SideBar