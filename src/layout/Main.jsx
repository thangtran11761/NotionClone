import React, { memo, useContext } from 'react'
import { Col, Row, Layout, Space } from 'antd';

import Task from '../components/Task/Task'
import SideBar from '../components/SideBar/SideBar';

import classes from './style.module.css'
import { PageContext } from '../context/Page.context';

const { Sider, Content } = Layout;

const Main = () => {
    const pageCtx = useContext(PageContext)

    return (
        <Layout className={classes.layout}>
            <Sider width={240}>
                <SideBar />
            </Sider>
            <Layout className={classes.content}>
                {pageCtx.page?.type === 'task' && (< Task page={pageCtx.page} />)}
            </Layout>
        </Layout>
    )
}

export default Main